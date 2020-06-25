import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePageScreenProps} from '../types/screenTypes';
import {AuthContextType} from '../types/contextTypes';
import {AuthContext} from '../contexts/AuthContext';
import {Text, Overlay, Input, Button} from 'react-native-elements';
import Dashboard from './Dashboard';
import MeetingsPage from './MeetingsPage';
import CustomDrawer from '../components/CustomDrawer';
import customAxios from '../helpers/customAxios';
import SignOutButton from '../components/SignOutButton';

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
        } else {
          setShowLinkWorkspaceModal(true);
        }
        setIsLoading(false);
      });
  }, []);

  const onPressLinkWorkspace = () => {
    customAxios
      .post('auth/link_workspace', {
        userid: auth.user?.uid,
        workspaceName: workspaceNameInput,
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
      return (
        <Drawer.Navigator
          drawerPosition="right"
          drawerContent={(props) => <CustomDrawer {...props} />}>
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="MeetingsPage" component={MeetingsPage} />
        </Drawer.Navigator>
      );
    }
  };

  return renderContent();
};

export default HomePage;