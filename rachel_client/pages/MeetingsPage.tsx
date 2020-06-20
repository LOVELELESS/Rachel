import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {MeetingsPageScreenProps} from '../types/screenTypes';
import HamburgerMenu from '../components/HamburgerMenu';

const MeetingsPage = ({route, navigation}: MeetingsPageScreenProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerMenu navigation={navigation} />,
    });
  }, [navigation]);

  return (
    <View>
      <Text h1>This is Meetings page!</Text>
    </View>
  );
};

export default MeetingsPage;
