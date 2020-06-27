import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigation from './AppNavigation';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

FontAwesomeIcons.loadFont();
MaterialIcons.loadFont();
Ionicons.loadFont();

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
