import express from "express";
import WorkspaceModel from "../models/Workspace";
import IMeetingParticipant from "../interfaces/IMeetingParticipant";
import IMeeting from "../interfaces/IMeeting";

const userMeetingRoutes = express.Router();

userMeetingRoutes.get("/", (req, res) => {
  const {
    workspaceName,
    userid,
  }: { workspaceName: string; userid: string } = req.body;
  res.json({
    msg: "this is user meeting routes",
    workspaceName,
    userid,
  });
});

/*
    req.body 
        - workspaceName : string
        - userid : string
        - title : string
        - description : string
        - participants : Array<IMeetingParticipant>
        - date: Date
    res.data 
        - msg : string
        - error : boolean     
*/
userMeetingRoutes.post("/new", (req, res) => {
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

  const newMeeting: IMeeting = {
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
              error: true,
            });
          } else {
            return res.json({
              msg: "Successfully saved new meeting",
              error: false,
            });
          }
        });
      } else {
        return res.json({
          msg:
            "Cannot find workspace / user matching the workspaceName and userid",
          error: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", error: true }));
});

export default userMeetingRoutes;
