import React from 'react';
import {Icon} from 'react-native-elements';

const HamburgerMenu = ({navigation}: any) => {
  console.log(navigation);
  return <Icon name="menu" onPress={() => navigation.toggleDrawer()} />;
};

export default HamburgerMenu;
