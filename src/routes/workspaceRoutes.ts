import express from "express";
import userRoutes from "./userRoutes";
import meetingRoutes from "./meetingRoutes";

const workspaceRoutes = express.Router();
workspaceRoutes.use(
  "/:workspaceName/users",
  (req, res, next) => {
    req.body.workspaceName = req.params.workspaceName;
    next();
  },
  userRoutes
);
workspaceRoutes.use("/:workspaceName/meetings", meetingRoutes);

export default workspaceRoutes;
