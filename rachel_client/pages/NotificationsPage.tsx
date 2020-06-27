import React from 'react';
import {View, Text} from 'react-native';
import {NotificationsPageProps} from '../types/screenTypes';

const NotificationsPage = ({route, navigation}: NotificationsPageProps) => {
  return (
    <View>
      <Text>This is notifications page</Text>
    </View>
  );
};

export default NotificationsPage;
