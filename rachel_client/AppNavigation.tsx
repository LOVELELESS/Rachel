import React, {useContext} from 'react';
import {AuthContext} from './contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types/navigationTypes';
import {AuthContextType} from 'types/contextTypes';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import AddOrEditMeetingPage from './pages/AddOrEditMeetingPage';
import ReceptionistWelcomePage from './pages/receptionist-flow/ReceptionistWelcomePage';
import ReceptionistQrReaderPage from './pages/receptionist-flow/ReceptionistQrReaderPage';
import ReceptionistFormPage from './pages/receptionist-flow/ReceptionistFormPage';

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
                headerLeftContainerStyle: {
                  marginLeft: 15,
                },
                headerRightContainerStyle: {
                  marginRight: 15,
                },
              }}
            />
            <RootStack.Screen
              name="AddOrEditMeetingPage"
              component={AddOrEditMeetingPage}
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
            <RootStack.Screen
              name="ReceptionistWelcomePage"
              component={ReceptionistWelcomePage}
            />
            <RootStack.Screen
              name="ReceptionistQrReaderPage"
              component={ReceptionistQrReaderPage}
            />
            <RootStack.Screen
              name="ReceptionistFormPage"
              component={ReceptionistFormPage}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
