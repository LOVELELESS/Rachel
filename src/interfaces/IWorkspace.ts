import { Document } from "mongoose";
import IUser from "./IUser";
import IMeeting from "./IMeeting";

interface IWorkspace extends Document {
  workspaceName: String;
  users: IUser[];
  meetings: IMeeting[];
}

export default IWorkspace;
