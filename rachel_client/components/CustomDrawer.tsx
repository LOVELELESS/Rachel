import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Avatar, Text, Divider, Icon} from 'react-native-elements';

const CustomDrawer = (props: any) => {
  return (
    <ScrollView>
      <Avatar
        size="large"
        overlayContainerStyle={{
          backgroundColor: 'blue',
        }}
        containerStyle={{margin: 'auto'}}
        rounded
        icon={{name: 'home'}}
      />
      <DrawerItemList {...props} />
    </ScrollView>
  );
};

export default CustomDrawer;
