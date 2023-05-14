import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './libs/hook/useAuth';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/public/Index';
import { ActivityIndicator } from '@react-native-material/core';

const Stack = createStackNavigator();

export default function Routes() {
  const { initLoading, isInRole, authenticated } = useAuth();
  return (
    <>
      {
        initLoading ?
          <NavigationContainer>
            <Stack.Navigator>

              <Stack.Screen name={"Index"} component={Index}></Stack.Screen>

            </Stack.Navigator>
          </NavigationContainer>
          :
          <ActivityIndicator size={"large"} />
      }
    </>
  )
}
