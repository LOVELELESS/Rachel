import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AuthContextType} from '../types/contextTypes';

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: null,
  userSettings: {
    role: null,
    workspaceName: null,
  },
  setUserSettings: null,
  loadingAuthState: true,
});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userSettings, setUserSettings] = useState<
    AuthContextType['userSettings']
  >({
    role: null,
    workspaceName: null,
  });
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
        setLoadingAuthState(false);
      },
    );
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userSettings,
        setUserSettings,
        loadingAuthState,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
