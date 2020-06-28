import express from "express";
import userMeetingRoutes from "./userMeetingRoutes";
import WorkspaceModel from "../models/Workspace";

const userRoutes = express.Router();
userRoutes.use(
  "/:userid/meetings",
  (req, res, next) => {
    req.body.userid = req.params.userid;
    next();
  },
  userMeetingRoutes
);

/*
    GETS ALL USERS 

    req.body 
        - workspaceName : string
    res.data 
        - msg : string
        - success : boolean     
        - users ?: [IUser]
*/
userRoutes.get("/", (req, res) => {
  const { workspaceName }: { workspaceName: string } = req.body;

  WorkspaceModel.findOne({ workspaceName })
    .then((workspace) => {
      if (workspace) {
        return res.json({
          msg: "Successfully retrieved all users",
          success: true,
          users: workspace.users,
        });
      } else {
        return res.json({
          msg: "Cannot find any workspaces with the given workspaceName",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

/*
    UPDATES USER PERMISSIONS

    req.body 
        - workspaceName : string
        - role : "ADMIN" | "FALLBACK" | "EMPLOYEE"
    res.data 
        - msg : string
        - success : boolean     
*/
userRoutes.put("/:userid/roles", (req, res) => {
  const {
    workspaceName,
    role,
  }: {
    workspaceName: string;
    role: "ADMIN" | "FALLBACK" | "EMPLOYEE";
  } = req.body;
  const userid: string = req.params.userid;
  WorkspaceModel.findOne({
    workspaceName,
    "users.userid": userid,
  })
    .then((workspace) => {
      if (workspace) {
        const newAdminIndx = workspace.users.findIndex(
          (user) => user.userid === userid
        );
        if (
          workspace.users[newAdminIndx].role === "ADMIN" &&
          (role === "EMPLOYEE" || role === "FALLBACK")
        ) {
          const adminCount = workspace.users.filter(
            (user) => user.role === "ADMIN"
          ).length; // num of admins must be >= 1

          if (adminCount === 1) {
            return res.json({
              msg: "There must be at least 1 admin in a workspace",
              success: false,
            });
          }
        }
        workspace.users[newAdminIndx].role = role;

        workspace.save((err) => {
          if (err) {
            return res.json({
              msg: "An error has occurred while saving workspace",
              success: false,
            });
          } else {
            return res.json({
              msg: `Successfully updated ${userid}'s role in ${workspaceName} to ${role}`,
              success: true,
            });
          }
        });
      } else {
        return res.json({
          msg: "No workspace found for the given workspaceName and userid",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occurred", success: false }));
});

export default userRoutes;
