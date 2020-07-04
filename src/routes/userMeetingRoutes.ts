import express from "express";
import WorkspaceModel from "../models/Workspace";
import IMeetingParticipant from "../interfaces/IMeetingParticipant";
import IMeeting from "../interfaces/IMeeting";
import mailgun from "mailgun-js";
import qrcode from "qrcode";
import fs from "fs";
import path from "path";

const userMeetingRoutes = express.Router();

/*
    GETS EXISTING MEETING

    req.body 
        - workspaceName : string
        - userid : string
    res.data 
        - msg : string
        - meeting : Array<IMeeting>
        - success : boolean
*/
userMeetingRoutes.get("/", (req, res) => {
  const {
    workspaceName,
    userid,
  }: {
    workspaceName: string;
    userid: string;
  } = req.body;

  WorkspaceModel.findOne({ workspaceName, "users.userid": userid })
    .then((workspace) => {
      if (workspace) {
        return res.json({
          msg: `Successfully retrieved ${userid}'s meetings`,
          meetings: workspace.users.filter((user) => user.userid === userid)[0]
            .meetings,
          success: true,
        });
      } else {
        return res.json({
          msg: "Cannot find data matching the workspaceName, userid",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

/*
    DELETES EXISTING MEETING

    req.body 
        - workspaceName : string
        - userid : string
    res.data 
        - msg : string
        - success : boolean
*/
userMeetingRoutes.delete("/:meetingid", (req, res) => {
  const {
    workspaceName,
    userid,
  }: {
    workspaceName: string;
    userid: string;
  } = req.body;

  const meetingid: string = req.params.meetingid;

  WorkspaceModel.findOne({
    workspaceName,
    "users.userid": userid,
    "meetings.meetingid": meetingid,
  })
    .then((workspace) => {
      if (workspace) {
        // delete from workspace meetings arr
        let delIndx = workspace.meetings.findIndex(
          (meeting) => meeting.meetingid === meetingid
        );
        workspace.meetings.splice(delIndx, 1);

        // delete from user meetings arr
        const userMeetingsArr = workspace.users.filter(
          (user) => user.userid === userid
        )[0].meetings;
        delIndx = userMeetingsArr.findIndex(
          (meeting) => meeting.meetingid === meetingid
        );
        userMeetingsArr.splice(delIndx, 1);

        workspace.save((err) => {
          if (err) {
            return res.json({
              msg: `An error occurred while deleting ${meetingid} in ${workspaceName}`,
              success: false,
            });
          } else {
            return res.json({
              msg: `Successfully deleted meeting ${meetingid} in ${workspaceName}`,
              success: true,
            });
          }
        });
      } else {
        return res.json({
          msg:
            "Cannot find data matching the workspaceName, userid, and meetingid",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

/*
    UPDATES EXISTING MEETING

    req.body 
        - workspaceName : string
        - userid : string
        - title : string
        - description : string
        - participants : Array<IMeetingParticipant>
        - date: Date
    res.data 
        - msg : string
        - success : boolean
*/
userMeetingRoutes.put("/:meetingid", (req, res) => {
  const {
    workspaceName,
    userid,
    title,
    description,
    participants,
    date,
  }: {
    workspaceName: string;
    userid: string;
    title: string;
    description: string;
    participants: Array<IMeetingParticipant>;
    date: Date;
  } = req.body;

  const meetingid: string = req.params.meetingid;

  const newMeeting: IMeeting = {
    meetingid,
    title,
    description,
    participants,
    date,
  };

  WorkspaceModel.findOne({
    workspaceName,
    "users.userid": userid,
    "meetings.meetingid": meetingid,
  })
    .then((workspace) => {
      if (workspace) {
        // replace in workspace meetings arr
        let replaceIndx = workspace.meetings.findIndex(
          (meeting) => meeting.meetingid === meetingid
        );
        workspace.meetings[replaceIndx] = newMeeting;

        // replace in user meetings arr
        const userMeetingsArr = workspace.users.filter(
          (user) => user.userid === userid
        )[0].meetings;
        replaceIndx = userMeetingsArr.findIndex(
          (meeting) => meeting.meetingid === meetingid
        );
        userMeetingsArr[replaceIndx] = newMeeting;
        workspace.save((err) => {
          if (err) {
            return res.json({
              msg: "An error has occurred while updating meeting",
              success: false,
            });
          } else {
            return res.json({
              msg: `Successfully updated meeting ${meetingid} in ${workspaceName}`,
              success: true,
            });
          }
        });
      } else {
        return res.json({
          msg:
            "Cannot find data matching the workspaceName, userid, and meetingid",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

/*
    CREATES NEW MEETING

    req.body 
        - workspaceName : string
        - userid : string
        - meetingid : string
        - title : string
        - description : string
        - participants : Array<IMeetingParticipant>
        - date: Date
    res.data 
        - msg : string
        - success : boolean     
*/
userMeetingRoutes.post("/", (req, res) => {
  const {
    workspaceName,
    userid,
    meetingid,
    title,
    description,
    participants,
    date,
  }: {
    workspaceName: string;
    userid: string;
    meetingid: string;
    title: string;
    description: string;
    participants: Array<IMeetingParticipant>;
    date: Date;
  } = req.body;

  const newMeeting: IMeeting = {
    meetingid,
    title,
    description,
    participants,
    date,
  };

  WorkspaceModel.findOne({
    workspaceName,
    "users.userid": userid,
  })
    .then((workspace) => {
      if (workspace) {
        // add meeting to the user
        workspace.users
          .filter((user) => user.userid === userid)[0]
          .meetings.push(newMeeting);

        // add meeting to the workspace meeting arr
        workspace.meetings.push(newMeeting);
        workspace.save((err) => {
          if (err) {
            return res.json({
              msg: "An error has occurred while saving new meeting",
              success: false,
            });
          } else {
            return res.json({
              msg: "Successfully saved new meeting",
              success: true,
            });
          }
        });
      } else {
        return res.json({
          msg: "Cannot find data matching the workspaceName and userid",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

userMeetingRoutes.post("/:meetingid/send_email", (req, res) => {
  const {
    workspaceName,
    userid,
  }: {
    workspaceName: string;
    userid: string;
  } = req.body;

  const meetingid: string = req.params.meetingid;

  WorkspaceModel.findOne({
    workspaceName,
    "users.userid": userid,
    "meetings.meetingid": meetingid,
  })
    .then((workspace) => {
      if (workspace) {
        let meetingIndx = workspace.meetings.findIndex(
          (meeting) => meeting.meetingid === meetingid
        );

        const meeting = workspace.meetings[meetingIndx];

        const participantsEmailArr = meeting.participants.map(
          (participant) => participant.email
        );

        const participantsEmailStr: string = participantsEmailArr.join(", ");

        qrcode.toFile(
          `src/images/${workspaceName}-${meetingid}-${meeting.title}.png`,
          JSON.stringify({
            qrCodeWorkspaceName: workspaceName,
            qrCodeMeetingId: meetingid,
          }),
          function (err) {
            if (err) {
              return res.json({
                msg: "An error occurred while sending message",
                success: false,
              });
            }

            const qrcodeFilepath = path.join(
              __dirname,
              `../images/${workspaceName}-${meetingid}-${meeting.title}.png`
            );

            const renderReadableDate = () => {
              const dateStr = meeting.date;
              const date = new Date(dateStr);
              let hr = date.getHours().toString();
              if (hr.length < 2) {
                hr = "0" + hr;
              }
              let min = date.getMinutes().toString();
              if (min.length < 2) {
                min = "0" + min;
              }
              return `${date.toLocaleDateString()}, ${hr}${min}`;
            };

            const data = {
              from: `NoReply-${workspaceName} <NoReply-${workspaceName}@rachel.raysonkoh.com>`,
              to: participantsEmailStr,
              subject: `Confirmation of meeting ${meeting.title}`,
              text: `Description: ${
                meeting.description
              } Meeting is set on ${renderReadableDate()}.`,
              attachment: qrcodeFilepath,
            };

            const mg = new mailgun({
              apiKey: process.env.MAILGUN_API_KEY as string,
              domain: process.env.MAILGUN_DOMAIN as string,
            });

            mg.messages().send(data, (error: any, body: any) => {
              fs.unlinkSync(qrcodeFilepath);
              if (error) {
                return res.json({
                  msg: "An error occurred while sending message",
                  success: false,
                });
              } else {
                return res.json({
                  msg: "Successfully sent message",
                  success: true,
                });
              }
            });
          }
        );
      } else {
        return res.json({
          msg:
            "Cannot find data matching the workspaceName, userid and meetingid",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

export default userMeetingRoutes;
