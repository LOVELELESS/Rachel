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
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification: any) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

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
        <Button
          title="Launch E-Receptionist"
          onPress={() => navigation.navigate('ReceptionistWelcomePage')}
        />
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
