import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import USCISScreen from './Screens/USCISScreen';
import EOIRScreen from './Screens/EOIRScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="USCIS" component={USCISScreen} />
        <Stack.Screen name="EOIR" component={EOIRScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}