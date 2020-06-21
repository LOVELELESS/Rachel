import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {IUser} from '../types/authTypes';

export type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  setUser: any;
  userSettings: IUser | null;
  setUserSettings: any;
  loadingAuthState: boolean;
};
