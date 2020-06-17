import express from "express";
import userRoutes from "./userRoutes";
import meetingRoutes from "./meetingRoutes";
import receptionistRoutes from "./receptionistRoutes";
import { app } from "../server";

const workspaceRoutes = express.Router();
workspaceRoutes.use(
  "/:workspaceName/users",
  (req, res, next) => {
    req.body.workspaceName = req.params.workspaceName;
    next();
  },
  userRoutes
);

workspaceRoutes.use(
  "/:workspaceName/receptionist",
  (req, res, next) => {
    req.body.workspaceName = req.params.workspaceName;
    next();
  },
  receptionistRoutes
);

workspaceRoutes.use("/:workspaceName/meetings", meetingRoutes);

export default workspaceRoutes;
