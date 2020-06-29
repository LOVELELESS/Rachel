import React from 'react';
import Config from 'react-native-config';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  onGoogleButtonPress,
  onFacebookButtonPress,
} from '../helpers/AuthHelpers';
import {SigninPageScreenProps} from '../types/screenTypes';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, SocialIcon, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

const SigninPage = ({route, navigation}: SigninPageScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h2 style={styles.title}>
          Welcome to Rachel!
        </Text>
        <Text h4 style={styles.subtitle1}>
          The E-Receptionist
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ReceptionistWelcomePage')}>
        <Icon
          type="font-awesome-5"
          name="concierge-bell"
          size={100}
          solid
          color={'#FF69B4'}
          style={styles.icon}
          containerStyle={styles.iconContainer}
          reverse
          raised
        />
        <Text h3 style={styles.subtitle1}>
          Launch E-Receptionist!
        </Text>
      </TouchableOpacity>
      <View>
        <Text h4 style={styles.subtitle2}>
          Please sign in to access your account:
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
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignSelf: 'center',
  },
  icon: {},
  loginButtons: {},
  title: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  subtitle1: {
    textAlign: 'center',
  },
  subtitle2: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  button: {
    margin: 10,
  },
});

export default SigninPage;
