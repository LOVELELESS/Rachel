import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, Button} from 'react-native';
import {NotificationsPageProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';
import {deepCopy} from '../helpers/arrayUtils';

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

  const onPressResponse = (formid, status) => {
    customAxios
      .post(
        `workspaces/${auth.userSettings.workspaceName}/notifications/${formid}`,
        {
          responseToForm: 'response test',
          finalStatus: status,
        },
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          const newNotifications = deepCopy(notifications);
          newNotifications[formid].response = 'response test';
          newNotifications[formid].status = status;
          setNotifications(newNotifications);
        }
      });
  };

  const renderContent = () => {
    return notifications.map((notification, i) => {
      if (notification.status === 'PENDING') {
        return (
          <View key={i}>
            <Text>{'<<<<<<'}</Text>
            <Text>{notification.id}</Text>
            <Text>{notification.content}</Text>
            <Text>{notification.status}</Text>
            <Button
              title="ACCEPT"
              onPress={() => onPressResponse(i, 'ACCEPT')}
            />
            <Button
              title="REJECT"
              onPress={() => onPressResponse(i, 'REJECT')}
            />
            <Text>{'<<<<<<'}</Text>
          </View>
        );
      } else {
        return (
          <View key={i}>
            <Text>{'<<<<<<'}</Text>
            <Text>{notification.id}</Text>
            <Text>{notification.content}</Text>
            <Text>{notification.status}</Text>
            <Text>{notification.response}</Text>
            <Text>{'<<<<<<'}</Text>
          </View>
        );
      }
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
