import React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

const HamburgerMenu = ({navigation}: any) => {
  return (
    <Icon
      size={40}
      name="menu"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  );
};

export default HamburgerMenu;
