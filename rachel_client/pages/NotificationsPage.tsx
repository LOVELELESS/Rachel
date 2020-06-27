import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {NotificationsPageProps} from '../types/screenTypes';
import messaging from '@react-native-firebase/messaging';

const NotificationsPage = ({route, navigation}: NotificationsPageProps) => {
  useEffect(() => {
    messaging().onMessage(() => {
      console.log('remote msg received in notification');
      //Toast.show({text: 'mesage received', buttonText: 'ok', position: 'top'});
    });
  }, []);

  return (
    <View>
      <Text>This is notifications page</Text>
    </View>
  );
};

export default NotificationsPage;
