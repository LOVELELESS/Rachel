import {StackScreenProps} from '@react-navigation/stack';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type RootStackParamList = {
  SigninPage: undefined;
  HomePage: {
    user: FirebaseAuthTypes.User | null;
  };
};

export type SigninPageScreenProps = StackScreenProps<
  RootStackParamList,
  'SigninPage'
>;

export type HomePageScreenProps = StackScreenProps<
  RootStackParamList,
  'HomePage'
>;
