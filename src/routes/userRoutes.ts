import express from "express";
import userMeetingRoutes from "./userMeetingRoutes";
import { nextTick } from "process";

const userRoutes = express.Router();
userRoutes.use(
  "/:userid/meetings",
  (req, res, next) => {
    req.body.userid = req.params.userid;
    next();
  },
  userMeetingRoutes
);

export default userRoutes;
