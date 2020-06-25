import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

const HamburgerMenu = () => {
  const navigation = useNavigation();
  return (
    <Icon
      size={40}
      name="menu"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} // not sure how to nest navigators properly so have to do this
    />
  );
};

export default HamburgerMenu;
