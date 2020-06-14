import mongoose from "mongoose";
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

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
