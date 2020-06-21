import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePageScreenProps} from '../types/screenTypes';
import Dashboard from './Dashboard';
import MeetingsPage from './MeetingsPage';

const Drawer = createDrawerNavigator();

const HomePage = ({route, navigation}: HomePageScreenProps) => {
  return (
    <Drawer.Navigator drawerPosition="right">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="MeetingsPage" component={MeetingsPage} />
    </Drawer.Navigator>
  );
};

export default HomePage;
