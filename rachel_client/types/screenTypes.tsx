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
