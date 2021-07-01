import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabBarProvider from './src/contexts/TabBarProvider';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <TabBarProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </TabBarProvider>
  );
}
