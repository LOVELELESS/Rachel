import IMeetingParticipant from "./IMeetingParticipant";

interface IMeeting {
  meetingid: string;
  title: string;
  description: string;
  participants: Array<IMeetingParticipant>;
  date: Date;
}

export default IMeeting;
