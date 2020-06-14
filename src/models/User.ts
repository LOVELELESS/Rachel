import mongoose from "mongoose";
import IUser from "../interfaces/IUser";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  workspaceName: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<IUser>("users", UserSchema);

export default UserModel;
