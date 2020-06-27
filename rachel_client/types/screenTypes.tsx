import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigationTypes';

export type SigninPageScreenProps = StackScreenProps<
  RootStackParamList,
  'SigninPage'
>;

export type HomePageScreenProps = StackScreenProps<
  RootStackParamList,
  'HomePage'
>;

export type DashboardScreenProps = StackScreenProps<
  RootStackParamList,
  'Dashboard'
>;

export type MeetingsPageScreenProps = StackScreenProps<
  RootStackParamList,
  'MeetingsPage'
>;

export type AddOrEditMeetingPageProps = StackScreenProps<
  RootStackParamList,
  'AddOrEditMeetingPage'
>;

export type NotificationsPageProps = StackScreenProps<
  RootStackParamList,
  'NotificationsPage'
>;

export type ReceptionistWelcomePageProps = StackScreenProps<
  RootStackParamList,
  'ReceptionistWelcomePage'
>;

export type ReceptionistQrReaderPageProps = StackScreenProps<
  RootStackParamList,
  'ReceptionistQrReaderPage'
>;

export type ReceptionistFormPageProps = StackScreenProps<
  RootStackParamList,
  'ReceptionistFormPage'
>;
