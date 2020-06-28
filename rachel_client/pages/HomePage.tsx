import React, {useState, useEffect, useContext} from 'react';
import {View, Alert} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePageScreenProps} from '../types/screenTypes';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';
import {Text, Overlay, Input, Button} from 'react-native-elements';
import Dashboard from './Dashboard';
import MeetingsPage from './MeetingsPage';
import NotificationsPage from './NotificationsPage';
import UsersPage from './UsersPage';
import CustomDrawer from '../components/CustomDrawer';
import customAxios from '../helpers/customAxios';
import SignOutButton from '../components/SignOutButton';
import HamburgerMenu from '../components/HamburgerMenu';
import messaging from '@react-native-firebase/messaging';

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
            console.log('received manual form submission');
            Alert.alert('received manual form submission');
          });
        } else {
          setShowLinkWorkspaceModal(true);
        }
        setIsLoading(false);
      });
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
        <View>
          <Text>IS LOADING</Text>
          <SignOutButton />
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
          <Drawer.Screen name="MeetingsPage" component={MeetingsPage} />
          {auth.userSettings.role === 'ADMIN' && (
            <>
              <Drawer.Screen
                name="NotificationsPage"
                component={NotificationsPage}
              />
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
