import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {NotificationsPageProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';

const NotificationsPage = ({route, navigation}: NotificationsPageProps) => {
  const [notifications, setNotifications] = useState<Array<Object>>([]);
  const auth: AuthContextType = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      customAxios
        .get(`workspaces/${auth.userSettings.workspaceName}/notifications`)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            setNotifications(res.data.notifications);
          }
        });
    }, []),
  );

  const renderContent = () => {
    return notifications.map((notification, i) => {
      return (
        <View key={i}>
          <Text>{'<<<<<<'}</Text>
          <Text>{notification.id}</Text>
          <Text>{notification.content}</Text>
          <Text>{notification.status}</Text>
          <Text>{'<<<<<<'}</Text>
        </View>
      );
    });
  };

  return (
    <View>
      <Text>This is notifications page</Text>
      {renderContent()}
    </View>
  );
};

export default NotificationsPage;
