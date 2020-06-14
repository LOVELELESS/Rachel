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
  meetings: {
    type: [
      {
        title: String,
        description: String,
        participants: [
          {
            name: String,
            email: String,
            phoneNumber: {
              type: String,
              default: "",
            },
          },
        ],
        date: Date,
      },
    ],
    required: true,
  },
});

const UserModel = mongoose.model<IUser>("users", UserSchema);

export default UserModel;
