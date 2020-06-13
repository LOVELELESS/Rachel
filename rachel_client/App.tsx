import React, {useState, useEffect} from 'react';
import {Text, Button, SafeAreaView} from 'react-native';
import Config from 'react-native-config';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
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
        <Button
          title="Google sign-in"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
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
    </SafeAreaView>
  );
};

export default App;
