import mongoose from "mongoose";
import IWorkspace from "../interfaces/IWorkspace";
const Schema = mongoose.Schema;

const WorkspaceSchema = new Schema({
  workspaceName: String,
  users: [
    {
      userid: String,
      email: String,
      role: String,
      meetings: [
        {
          meetingid: String,
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
    },
  ],
  meetings: [
    {
      meetingid: String,
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
});

const WorkspaceModel = mongoose.model<IWorkspace>(
  "workspaces",
  WorkspaceSchema
);

export default WorkspaceModel;
