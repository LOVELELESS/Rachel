import { Document } from "mongoose";
import IUser from "./IUser";
import IMeeting from "./IMeeting";
import INotification from "./INotification";

interface IWorkspace extends Document {
  workspaceName: String;
  users: IUser[];
  meetings: IMeeting[];
  notifications: INotification[];
}

export default IWorkspace;
