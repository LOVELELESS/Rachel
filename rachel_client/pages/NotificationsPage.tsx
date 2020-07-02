import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';
import {NotificationsPageProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {deepCopy} from '../helpers/arrayUtils';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import NotificationCard from '../components/NotificationCard';
import LoadingIndicator from '../components/LoadingIndicator';

const NotificationsPage = ({route, navigation}: NotificationsPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
            setIsLoading(false);
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
    if (notifications.length === 0) {
      return <Text h4>No notifications found!</Text>;
    }
    return notifications
      .map((notification, i) => (
        <NotificationCard notification={notification} key={i} />
      ))
      .reverse();
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isLoading ? 'lightgrey' : 'white',
        justifyContent: isLoading ? 'center' : 'flex-start',
      }}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={styles.contentContainer}>
          {renderContent()}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '95%',
    alignSelf: 'center',
  },
});
