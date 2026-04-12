import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Screens/HomeScreen';
import USCISScreen from './Screens/USCISScreen';
import EOIRScreen from './Screens/EOIRScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0A1F44' },
          headerTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#0A1F44' },
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: '#ccc',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="USCIS" component={USCISScreen} />
        <Tab.Screen name="EOIR" component={EOIRScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}