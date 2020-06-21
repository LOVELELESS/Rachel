export interface IMeeting {
  meetingid: string;
  title: string;
  description: string;
  participants: Array<IMeetingParticipant>;
  date: Date;
}

export interface IMeetingParticipant {
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface IUser {
  userid: string;
  email: string;
  role: 'EMPLOYEE' | 'ADMIN';
  meetings: Array<IMeeting>;
}
