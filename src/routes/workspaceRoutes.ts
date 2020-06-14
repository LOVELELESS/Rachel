import express from "express";
import userRoutes from "./userRoutes";
import meetingRoutes from "./meetingRoutes";

const workspaceRoutes = express.Router();
workspaceRoutes.use("/users", userRoutes);
workspaceRoutes.use("/meetings", meetingRoutes);

export default workspaceRoutes;
