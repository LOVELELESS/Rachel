import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import {Avatar, Text} from 'react-native-elements';

const CustomDrawer = (props: any) => {
  return (
    <ScrollView>
      <Avatar
        size="large"
        overlayContainerStyle={{
          backgroundColor: 'lightgrey',
        }}
        containerStyle={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        rounded
        icon={{name: 'user', type: 'font-awesome'}}
      />
      <Text style={styles.subtitle}>NAME</Text>
      <DrawerItemList {...props} />
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  subtitle: {
    padding: 10,
    textAlign: 'center',
  },
});
