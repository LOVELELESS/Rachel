import React, {useState, useEffect} from 'react';
import {Text, Button, SafeAreaView} from 'react-native';
import Config from 'react-native-config';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import FallbackTab from './components/FallbackTab';
import QRcodeReaderTab from './components/QRcodeReaderTab';

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

async function onGoogleButtonPress() {
  // Get the users ID token
  await GoogleSignin.signIn();
  const {idToken, accessToken} = await GoogleSignin.getTokens();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    idToken,
    accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setInitializing(true);
    setUser(user);
    setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const renderContents = () => {
    if (initializing) {
      return <Text>Initializing...</Text>;
    } else if (!user) {
      return (
        <>
          <Button
            title="Google sign-in"
            onPress={() => {
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              );
            }}
          />
          <Button
            title="Facebook sign-in"
            onPress={() => {
              onFacebookButtonPress().then(() =>
                console.log('Signed in with Facebook!'),
              );
            }}
          />
        </>
      );
    } else {
      return <Text>Welcome {user.displayName}!</Text>;
    }
  };

  return (
    <SafeAreaView>
      {renderContents()}
      <Button
        title="Sign out"
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('successfully signed out!'))
        }
      />
      <FallbackTab />
      <QRcodeReaderTab />
    </SafeAreaView>
  );
};

export default App;
