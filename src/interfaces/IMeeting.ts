import { Document } from "mongoose";
import IMeetingParticipant from "./IMeetingParticipant";

interface IMeeting {
  title: string;
  description: string;
  participants: Array<IMeetingParticipant>;
  date: Date;
}

export default IMeeting;
