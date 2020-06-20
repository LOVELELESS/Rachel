import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigation from './AppNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
