import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePageScreenProps} from '../types/screenTypes';
import Dashboard from './Dashboard';
import MeetingsPage from './MeetingsPage';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const HomePage = ({route, navigation}: HomePageScreenProps) => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="MeetingsPage" component={MeetingsPage} />
    </Drawer.Navigator>
  );
};

export default HomePage;
