import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigation from './AppNavigation';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

FontAwesomeIcons.loadFont();
MaterialIcons.loadFont();

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
