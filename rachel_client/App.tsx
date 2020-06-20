import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types/typings';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import SignOutButton from './components/SignOutButton';

const RootStack = createStackNavigator<RootStackParamList>();

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

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {user ? (
          <>
            <RootStack.Screen
              name="HomePage"
              component={HomePage}
              initialParams={{user}}
              options={{
                headerRight: () => <SignOutButton />,
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen name="SigninPage" component={SigninPage} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
