import React from 'react';
import {Button} from 'react-native-elements';
import {onSignOutPress} from '../helpers/AuthHelpers';
import {StyleSheet} from 'react-native';

const SignOutButton = ({
  title = 'Sign Out',
  type = 'solid',
  icon,
  titleStyle,
}: {
  title: string;
  type: string;
  icon?: Object;
  titleStyle?: Object;
}) => {
  return (
    <Button
      title={title}
      type={type}
      icon={icon}
      titleStyle={titleStyle}
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
