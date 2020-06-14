import express from "express";
import userMeetingRoutes from "./userMeetingRoutes";

const userRoutes = express.Router();
userRoutes.use("/meetings", userMeetingRoutes);

export default userRoutes;
