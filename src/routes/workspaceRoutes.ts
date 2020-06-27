import express from "express";
import userRoutes from "./userRoutes";
import meetingRoutes from "./meetingRoutes";
import receptionistRoutes from "./receptionistRoutes";
import notificationRoutes from "./notificationRoutes";

const workspaceRoutes = express.Router();

const trfWorkspaceName = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  req.body.workspaceName = req.params.workspaceName;
  next();
};

workspaceRoutes.use("/:workspaceName/users", trfWorkspaceName, userRoutes);

workspaceRoutes.use(
  "/:workspaceName/receptionist",
  trfWorkspaceName,
  receptionistRoutes
);

workspaceRoutes.use(
  "/:workspaceName/meetings",
  trfWorkspaceName,
  meetingRoutes
);

workspaceRoutes.use(
  "/:workspaceName/notifications",
  trfWorkspaceName,
  notificationRoutes
);

export default workspaceRoutes;
