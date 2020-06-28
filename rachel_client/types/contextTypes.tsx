import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  setUser: any;
  userSettings: {
    role: 'EMPLOYEE' | 'ADMIN' | 'FALLBACK' | null;
    workspaceName: string | null;
  };
  setUserSettings: any;
  loadingAuthState: boolean;
};
