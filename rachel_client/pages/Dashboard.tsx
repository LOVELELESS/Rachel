import React, {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {DashboardScreenProps} from 'types/screenTypes';
import HamburgerMenu from '../components/HamburgerMenu';

const Dashboard = ({route, navigation}: DashboardScreenProps) => {
  const auth: AuthContextType = useContext(AuthContext);
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerMenu navigation={navigation} />,
      title: 'dashboard',
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text h1>This is the Dashboard page</Text>
      <Text>{auth.user ? auth.user.displayName : 'NULL USER'}</Text>
    </SafeAreaView>
  );
};

export default Dashboard;
