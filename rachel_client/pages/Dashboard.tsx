import React, {useContext} from 'react';
import {DashboardScreenProps} from '../types/screenTypes';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';

const Dashboard = ({route, navigation}: DashboardScreenProps) => {
  const auth: AuthContextType = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text h1>This is the Dashboard page</Text>
    </SafeAreaView>
  );
};

export default Dashboard;
