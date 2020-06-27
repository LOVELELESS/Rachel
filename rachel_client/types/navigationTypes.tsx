export type RootStackParamList = {
  SigninPage: undefined;
  HomePage: undefined;
  Dashboard: undefined;
  MeetingsPage: undefined;
  AddOrEditMeetingPage?: {
    meetingData: {
      title: string;
      description: string;
      meetingid: string;
      participants: Array<Object>;
    };
  };
  NotificationsPage: undefined;
  ReceptionistWelcomePage: undefined;
  ReceptionistQrReaderPage: {
    workspaceName: string;
  };
};
