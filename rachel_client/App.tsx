import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigation from './AppNavigation';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    messaging()
      .requestPermission()
      .then((authStatus) => console.log(authStatus));
  }, []);

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
