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
