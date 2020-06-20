import React, {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {HomePageScreenProps} from 'types/screenTypes';

const HomePage = ({route, navigation}: HomePageScreenProps) => {
  const auth: AuthContextType = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Text>This is the home screen</Text>
      <Text>{auth.user ? auth.user.displayName : 'NULL USER'}</Text>
    </SafeAreaView>
  );
};

export default HomePage;
