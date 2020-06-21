import React from 'react';
import {Button} from 'react-native-elements';
import {onSignOutPress} from '../helpers/AuthHelpers';
import {StyleSheet} from 'react-native';

const SignOutButton = () => {
  return (
    <Button
      title="Sign Out"
      style={styles.signOutButton}
      onPress={onSignOutPress}
    />
  );
};

export default SignOutButton;

const styles = StyleSheet.create({
  signOutButton: {
    padding: 15,
  },
});
