import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {MeetingsPageScreenProps} from '../types/screenTypes';

const MeetingsPage = ({route, navigation}: MeetingsPageScreenProps) => {
  return (
    <View>
      <Text h1>This is Meetings page!</Text>
    </View>
  );
};

export default MeetingsPage;
