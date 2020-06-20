import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigation from './AppNavigation';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
