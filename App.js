import React from 'react';
import { AuthProvider } from './App/context/AuthContext';
import AppNavigator from './App/components/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;


