import { Document } from "mongoose";
import IMeeting from "./IMeeting";

interface IUser extends Document {
  userid: string;
  workspaceName: string;
  meetings: Array<IMeeting>;
}

export default IUser;
