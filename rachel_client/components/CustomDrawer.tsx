import React, {useContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import {Avatar, Text} from 'react-native-elements';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types/contextTypes';
import SignOutButton from './SignOutButton';

const CustomDrawer = (props: any) => {
  const auth: AuthContextType = useContext(AuthContext);

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
      <Text style={styles.subtitle}>{auth.user?.displayName}</Text>
      <Text style={styles.subtitle}>
        {auth.userSettings?.workspaceName
          ? auth.userSettings.workspaceName
          : 'NULL WORKSPACE'}{' '}
        workspace
      </Text>
      <Text style={styles.subtitle}>
        {auth.userSettings.role ? auth.userSettings.role : 'NULL ROLE'} role
      </Text>
      <SignOutButton />
      <DrawerItemList {...props} />
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    padding: 10,
  },
});
