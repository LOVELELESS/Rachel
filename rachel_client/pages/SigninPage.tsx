import React from 'react';
import Config from 'react-native-config';
import {SigninPageScreenProps} from '../types/screenTypes';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, SocialIcon, Button} from 'react-native-elements';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  onGoogleButtonPress,
  onFacebookButtonPress,
} from '../helpers/AuthHelpers';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

const SigninPage = ({route, navigation}: SigninPageScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text h4 style={styles.title}>
        Welcome to Rachel!
      </Text>
      <Text style={styles.subtitle1}>The E-Receptionist</Text>
      <View style={styles.dummy} />
      <Text style={styles.subtitle2}>
        Please sign in to either your Google or Facebook account to continue
      </Text>
      <View style={styles.loginButtons}>
        <SocialIcon
          title="Sign In With Google"
          button
          style={styles.button}
          onPress={onGoogleButtonPress}
          type="google"
        />
        <SocialIcon
          title="Sign In With Facebook"
          button
          style={styles.button}
          onPress={onFacebookButtonPress}
          type="facebook"
        />
        <Button title="Launch E-Receptionist" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dummy: {
    height: '25%',
  },
  loginButtons: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  subtitle1: {
    textAlign: 'center',
    fontSize: 22,
    padding: 20,
  },
  subtitle2: {
    textAlign: 'center',
    padding: 10,
    fontSize: 24,
  },
  button: {
    margin: 10,
  },
});

export default SigninPage;
