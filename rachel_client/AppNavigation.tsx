import React, {useContext} from 'react';
import {AuthContext} from './contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types/navigationTypes';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import SignOutButton from './components/SignOutButton';
import {AuthContextType} from 'types/contextTypes';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const auth: AuthContextType = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {auth.user ? (
          <>
            <RootStack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                headerRight: () => <SignOutButton />,
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="SigninPage"
              component={SigninPage}
              options={{
                animationTypeForReplace: auth.user ? 'push' : 'pop', // 'pop' animation for signing out as it is more natural
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
