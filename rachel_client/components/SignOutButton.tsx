import React from 'react';
import {Button} from 'react-native-elements';
import {onSignOutPress} from '../helpers/AuthHelpers';

const SignOutButton = () => {
  return <Button title="Sign Out" onPress={onSignOutPress} />;
};

export default SignOutButton;
