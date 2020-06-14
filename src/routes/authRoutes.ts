import express from "express";
import WorkspaceModel from "../models/Workspace";
import IUser from "../interfaces/IUser";
const authRoutes = express.Router();

/*
    req.body 
        - userid : string
    res.data 
        - isVerified?: boolean,
        - error: boolean     
*/
authRoutes.post("/login", (req, res) => {
  const { userid }: { userid: string } = req.body;
  WorkspaceModel.findOne({ "users.userid": userid })
    .then((workspace) => {
      if (workspace) {
        res.json({
          msg: "Found user",
          isVerified: true,
          error: false,
        });
      } else {
        res.json({
          msg: "User not found",
          isVerified: false,
          error: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", error: true }));
});

/*
    req.body 
        - userid : string
        - workspaceName : string
    res.data 
        - msg : string
        - error: boolean     
*/
authRoutes.post("/link_workspace", (req, res) => {
  const {
    userid,
    workspaceName,
  }: { userid: string; workspaceName: string } = req.body;
  WorkspaceModel.findOne({ workspaceName })
    .then((workspace) => {
      const newUser: IUser = {
        userid,
        meetings: [],
      };
      if (workspace) {
        workspace.users.push(newUser);
        workspace.save((err) => {
          if (err) {
            res.json({
              msg: "An error has occured when saving new user",
              error: true,
            });
          } else {
            res.json({
              msg: `Successfully saved new user to workspace ${workspaceName}`,
              error: false,
            });
          }
        });
      } else {
        // create new workspace
        const newWorkspace = new WorkspaceModel({
          workspaceName,
          users: [newUser],
        });
        newWorkspace.save((err) => {
          if (err) {
            res.json({
              msg: `An error has occured when saving new user to new workspace ${workspaceName}`,
              error: true,
            });
          } else {
            res.json({
              msg: `Successfully saved new user to new workspace ${workspaceName}`,
              error: false,
            });
          }
        });
      }
    })
    .catch((err) => res.json({ msg: "An error is occurred", error: true }));
});

/*
authRoutes.post("/test", (req, res) => {
  const newWorkspace = new WorkspaceModel({
    workspaceName: "testWorkSpaceName",
    users: [{ userid: "testUserId", meetings: [] }],
    meetings: [],
  });
  newWorkspace.save((err, ws) => {
    if (err) res.json({ msg: "failed", err });
    else
      res.json({
        msg: "success",
        workspace: ws,
      });
  });
});
*/

export default authRoutes;
