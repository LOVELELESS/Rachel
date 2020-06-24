import React, {useContext} from 'react';
import {AuthContext} from './contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types/navigationTypes';
import {AuthContextType} from 'types/contextTypes';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import AddOrEditMeetingPage from './pages/AddOrEditMeetingPage';
import HamburgerMenu from './components/HamburgerMenu';

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
              options={({navigation}) => ({
                headerRight: () => <HamburgerMenu navigation={navigation} />,
                headerLeftContainerStyle: {
                  marginLeft: 15,
                },
                headerRightContainerStyle: {
                  marginRight: 15,
                },
              })}
            />
            <RootStack.Screen
              name="AddOrEditMeetingPage"
              component={AddOrEditMeetingPage}
              options={({navigation}) => ({
                headerRight: () => <HamburgerMenu navigation={navigation} />,
                headerLeftContainerStyle: {
                  marginLeft: 15,
                },
                headerRightContainerStyle: {
                  marginRight: 15,
                },
              })}
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
