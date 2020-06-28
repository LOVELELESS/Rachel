import React from 'react';
import {View, Text} from 'react-native';
import {UsersPageProps} from '../types/screenTypes';

const UsersPage = ({route, navigation}: UsersPageProps) => {
  return (
    <View>
      <Text>This is the users page</Text>
    </View>
  );
};

export default UsersPage;
