import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Para los íconos de navegación
import WelcomeScreen from './App/screens/WelcomeScreen';
import RegisterScreen from './App/screens/RegisterScreen';
import SistemasLayout from './App/screens/SistemasLayout';
import RegisterSystem from './App/screens/RegisterSystem';
import DataSystem from './App/screens/DataSystem';
import colors from './App/config/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SystemsTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Registrar Sistema') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Sistema') {
            iconName = focused ? 'information-circle' : 'information-circle-outline'; // Ícono para la nueva pestaña
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={SistemasLayout} />
      <Tab.Screen name="Registrar Sistema" component={RegisterSystem} />
      <Tab.Screen name="Sistema" component={DataSystem} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Systems" component={SystemsTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
