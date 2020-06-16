import IMeeting from "./IMeeting";
import { IRouterHandler } from "express";

interface IUser {
  userid: string;
  email: string;
  role: "EMPLOYEE" | "ADMIN";
  meetings: Array<IMeeting>;
}

export default IUser;
