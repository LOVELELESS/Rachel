import IMeeting from "./IMeeting";

interface IUser {
  userid: string;
  displayName: string;
  email: string;
  role: "EMPLOYEE" | "ADMIN";
  meetings: Array<IMeeting>;
}

export default IUser;
