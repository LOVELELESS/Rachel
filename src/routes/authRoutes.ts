import express from "express";
import WorkspaceModel from "../models/Workspace";
import IUser from "../interfaces/IUser";

const authRoutes = express.Router();

/*
    req.body 
        - userid : string
    res.data 
        - msg : string
        - success : boolean     
*/
authRoutes.post("/login", (req, res) => {
  const { userid }: { userid: string } = req.body;
  WorkspaceModel.findOne({ "users.userid": userid })
    .then((workspace) => {
      if (workspace) {
        return res.json({
          msg: "Found user",
          success: true,
        });
      } else {
        return res.json({
          msg: "User not found",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

/*
    req.body 
        - userid : string
        - workspaceName : string
    res.data 
        - msg : string
        - success : boolean     
*/
authRoutes.post("/link_workspace", (req, res) => {
  const {
    workspaceName,
    userid,
    email,
  }: { workspaceName: string; userid: string; email: string } = req.body;
  WorkspaceModel.findOne({ workspaceName })
    .then((workspace) => {
      if (workspace) {
        const newUser: IUser = {
          userid,
          email,
          role: "EMPLOYEE",
          meetings: [],
        };
        workspace.users.push(newUser);
        workspace.save((err) => {
          if (err) {
            return res.json({
              msg: "An error has occured when saving new user",
              success: false,
            });
          } else {
            return res.json({
              msg: `Successfully saved new user to workspace ${workspaceName}`,
              success: true,
            });
          }
        });
      } else {
        // create new workspace
        const newUser: IUser = {
          userid,
          email,
          role: "ADMIN",
          meetings: [],
        };
        const newWorkspace = new WorkspaceModel({
          workspaceName,
          users: [newUser],
        });
        newWorkspace.save((err) => {
          if (err) {
            return res.json({
              msg: `An error has occured when saving new user to new workspace ${workspaceName}`,
              success: false,
            });
          } else {
            return res.json({
              msg: `Successfully saved new user to new workspace ${workspaceName}`,
              success: true,
            });
          }
        });
      }
    })
    .catch((err) => res.json({ msg: "An error is occurred", success: false }));
});

export default authRoutes;
