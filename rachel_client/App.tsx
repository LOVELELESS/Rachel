import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigation from './AppNavigation';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

FontAwesomeIcons.loadFont();
MaterialIcons.loadFont();
Ionicons.loadFont();

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
