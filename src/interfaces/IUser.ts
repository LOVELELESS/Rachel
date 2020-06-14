import IMeeting from "./IMeeting";

interface IUser {
  userid: string;
  meetings: Array<IMeeting>;
}

export default IUser;
