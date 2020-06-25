import express from "express";
import WorkspaceModel from "../models/Workspace";
import { io } from "../server";
import { totp } from "otplib";
import mailgun from "mailgun-js";

const receptionistRoutes = express.Router();

io.on("connection", (socket: SocketIO.Socket) => {
  console.log("socket connected");
  const { workspaceName }: { workspaceName: string } = socket.handshake.query;
  socket.join(workspaceName);

  socket.on("manual_form_reply", (data) => {
    console.log(data);
    io.to(workspaceName).emit("manual_form_get_reply", data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

receptionistRoutes.post("/submit_form", (req, res) => {
  const { workspaceName }: { workspaceName: string } = req.body;
  io.to(workspaceName).emit("manual_form_submission", { hello: "world" }); // REPLACE WITH FORM DATA
  res.json({
    msg: "Successfully emitted manual_form_submission to fallback employee",
  });
});

receptionistRoutes.post("/verify_qrcode", (req, res) => {});

/*
    SECOND STEP VERIFICATION (CHECK TOTP TOKEN)

    req.body 
        - workspaceName : string
        - token : string
    res.data 
        - success : boolean
*/
receptionistRoutes.post("/check_otp_token", (req, res) => {
  const {
    workspaceName,
    token,
  }: { workspaceName: string; token: string } = req.body;
  const isValid = totp.check(token, process.env.TOTP_SECRET as string);
  return res.json({
    success: isValid,
  });
});

/*
    FIRST STEP VERIFICATION (VERIFY WORKSPACE EXISTS)

    req.body 
        - workspaceName : string
    res.data 
        - msg : string
        - success : boolean
        - token ?: string
*/
receptionistRoutes.post("/verify", (req, res) => {
  const { workspaceName }: { workspaceName: string } = req.body;
  WorkspaceModel.findOne({ workspaceName })
    .then((workspace) => {
      if (workspace) {
        const token = totp.generate(process.env.TOTP_SECRET as string);

        let adminEmails: Array<string> = workspace.users
          .filter((user) => user.role === "ADMIN")
          .map((user) => user.email);

        const mg = new mailgun({
          apiKey: process.env.MAILGUN_API_KEY as string,
          domain: process.env.MAILGUN_DOMAIN as string,
        });

        const adminEmailsStr = adminEmails.join(",");
        const data = {
          from: `No-Reply-${workspaceName} <NoReply@mg.${workspaceName}.com>`,
          to: adminEmailsStr,
          subject: `OTP for launching E-Receptionist`,
          text: `Token: ${token}`,
        };

        mg.messages().send(data, (error: any, body: any) => {
          if (error) {
            console.log(error);
            return res.json({
              msg:
                "Verified workspace, but an error occurred while sending the email",
              success: false,
              token,
            });
          } else {
            return res.json({
              msg: "Successfully sent message with OTP",
              success: true,
            });
          }
        });
      } else {
        return res.json({
          msg: "Workspace not found",
          success: false,
        });
      }
    })
    .catch((e) =>
      res.json({
        msg: "An error has occured",
        success: false,
      })
    );
});

export default receptionistRoutes;
