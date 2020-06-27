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

    messaging()
      .subscribeToTopic('test')
      .then(() => console.log('subscribed to topic'));

    // When a user tap on a push notification and the app is in background
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('Background Push Notification opened');
    });

    // When a user tap on a push notification and the app is CLOSED
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('App Closed Push Notification opened');
        }
      });

    // When a user receives a push notification and the app is in foreground
    messaging().onMessage(() => {
      console.log('remote msg received');
      //Alert.alert('Foreground Push Notification opened');
    });
  }, []);

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
