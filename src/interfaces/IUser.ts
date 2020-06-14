import { Document } from "mongoose";

interface IUser extends Document {
  userid: string;
  workspaceName: string;
}

export default IUser;
