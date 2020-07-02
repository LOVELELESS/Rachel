import React, {useState, useEffect, useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';
import messaging from '@react-native-firebase/messaging';
import {HomePageScreenProps} from '../types/screenTypes';
import customAxios from '../helpers/customAxios';
import {View, Alert, StyleSheet} from 'react-native';
import {Text, Overlay, Input, Button} from 'react-native-elements';
import Dashboard from './Dashboard';
import MeetingsPage from './MeetingsPage';
import NotificationsPage from './NotificationsPage';
import UsersPage from './UsersPage';
import CustomDrawer from '../components/CustomDrawer';
import SignOutButton from '../components/SignOutButton';
import HamburgerMenu from '../components/HamburgerMenu';
import LoadingIndicator from '../components/LoadingIndicator';

const Drawer = createDrawerNavigator();

const HomePage = ({route, navigation}: HomePageScreenProps) => {
  const auth: AuthContextType = useContext(AuthContext);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [showLinkWorkspaceModal, setShowLinkWorkspaceModal] = useState<boolean>(
    false,
  );
  const [workspaceNameInput, setWorkspaceNameInput] = useState<string>('');

  useEffect(() => {
    customAxios
      .post('auth/login', {
        userid: auth.user?.uid,
      })
      .then((res) => {
        if (res.data.success) {
          auth.setUserSettings({
            role: res.data.role,
            workspaceName: res.data.workspaceName,
          });

          messaging()
            .unsubscribeFromTopic(
              `${auth.userSettings.workspaceName}-receptionist`,
            )
            .then(() => console.log('unsubscribed from receptionist topic!'));

          if (res.data.role === 'ADMIN' || res.data.role === 'FALLBACK') {
            messaging()
              .subscribeToTopic(`${res.data.workspaceName}-fallback`)
              .then(() => console.log('subscribed to fallback topic'));

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

            messaging().onMessage((msg) => {
              console.log(msg);
              console.log('received manual form submission');
              Alert.alert('received manual form submission');
            });
          }
        } else {
          setShowLinkWorkspaceModal(true);
        }
        setIsLoading(false);
      });

    return () => {
      messaging()
        .unsubscribeFromTopic(`${auth.userSettings.workspaceName}-fallback`)
        .then(() => console.log('unsubscribed from fallback topic!'));
    };
  }, []);

  const onPressLinkWorkspace = () => {
    customAxios
      .post('auth/link_workspace', {
        workspaceName: workspaceNameInput,
        userid: auth.user?.uid,
        displayName: auth.user?.displayName,
        email: auth.user?.email,
      })
      .then((res) => {
        auth.setUserSettings({
          role: res.data.role,
          workspaceName: workspaceNameInput,
        });
        setShowLinkWorkspaceModal(false);
      });
  };

  const renderContent = () => {
    if (loading) {
      navigation.setOptions({
        headerRight: undefined,
      });
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
          <SignOutButton
            title="Cancel"
            type="clear"
            icon={{name: 'close', color: 'red'}}
            titleStyle={styles.signOutTitle}
          />
        </View>
      );
    } else if (showLinkWorkspaceModal) {
      return (
        <Overlay isVisible={showLinkWorkspaceModal}>
          <View>
            <Text h4>
              You have not linked your account to your company's workspace
            </Text>
            <Text h4>Please input the name of your company's workspace</Text>
            <Input
              placeholder="Workspace Name"
              onChangeText={(e) => setWorkspaceNameInput(e)}
              value={workspaceNameInput}
            />
            <Button title="Submit" onPress={onPressLinkWorkspace} />
          </View>
        </Overlay>
      );
    } else {
      navigation.setOptions({
        headerRight: () => <HamburgerMenu />,
      });
      return (
        <Drawer.Navigator
          drawerPosition="right"
          drawerContent={(props) => <CustomDrawer {...props} />}>
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          {(auth.userSettings.role === 'ADMIN' ||
            auth.userSettings.role === 'FALLBACK') && (
            <>
              <Drawer.Screen
                name="NotificationsPage"
                component={NotificationsPage}
              />
            </>
          )}
          {auth.userSettings.role === 'ADMIN' && (
            <>
              <Drawer.Screen name="UsersPage" component={UsersPage} />
            </>
          )}
        </Drawer.Navigator>
      );
    }
  };

  return renderContent();
};

export default HomePage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
  },
  signOutTitle: {
    color: 'red',
  },
});
