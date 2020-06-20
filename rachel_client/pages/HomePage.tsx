import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {HomePageScreenProps} from 'types/typings';

const HomePage = ({route, navigation}: HomePageScreenProps) => {
  return (
    <SafeAreaView>
      <Text>This is the home screen</Text>
      <Text>{route.params.user?.displayName}</Text>
    </SafeAreaView>
  );
};

export default HomePage;
