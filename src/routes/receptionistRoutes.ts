import express from "express";
import WorkspaceModel from "../models/Workspace";
import { totp } from "otplib";
import mailgun from "mailgun-js";

totp.options = { step: 300 };

const receptionistRoutes = express.Router();

/*
    VERIFY QRCODE DATA FOR USERS WITH SCHEDULED MEETING

    req.body 
        - workspaceName : string
        - qrCodeData : string (in the form JSON.stringify({qrCodeWorkspaceName: workspaceName, qrCodeMeetingId: meetingid})
    res.data 
        - msg : string
        - success : boolean
*/
receptionistRoutes.post("/verify_qrcode", (req, res) => {
  const {
    workspaceName,
    qrCodeData,
  }: { workspaceName: string; qrCodeData: string } = req.body;
  const { qrCodeWorkspaceName, qrCodeMeetingId } = JSON.parse(qrCodeData);
  if (qrCodeWorkspaceName !== workspaceName) {
    return res.json({
      msg: "Invalid qr code: workspaceName not matching",
      success: false,
    });
  }

  WorkspaceModel.findOne({
    workspaceName,
    "meetings.meetingid": qrCodeMeetingId,
  })
    .then((workspace) => {
      if (workspace) {
        const user = workspace.users.filter(
          (user) =>
            user.meetings.findIndex(
              (meeting) => meeting.meetingid === qrCodeMeetingId
            ) >= 0
        )[0];
        res.json({
          msg: `Verified scheduled meeting. ${user.displayName} has been contacted about your arrival`,
          success: true,
        });
      } else {
        return res.json({
          msg: "Invalid meetingid",
          success: false,
        });
      }
    })
    .catch((err) =>
      res.json({
        msg: "An error has occurred",
        success: false,
      })
    );
});

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
  console.log(totp.timeRemaining());
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
              token,
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
