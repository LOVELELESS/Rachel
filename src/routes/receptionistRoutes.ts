import express from "express";
import WorkspaceModel from "../models/Workspace";
import { io } from "../server";
import { totp } from "otplib";

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

receptionistRoutes.post("/verify", (req, res) => {
  const { workspaceName }: { workspaceName: string } = req.body;
  WorkspaceModel.findOne({ workspaceName })
    .then((workspace) => {
      if (workspace) {
        const token = totp.generate(process.env.TOTP_SECRET as string);
        return res.json({
          msg: "Verified workspace",
          success: true,
          token,
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
