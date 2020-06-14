import IMeetingParticipants from "./IMeetingParticipant";

interface IMeeting {
  title: string;
  description: string;
  participants: Array<IMeetingParticipants>;
  date: Date;
}

export default IMeeting;
