import React from 'react'
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import useAuth from './libs/hook/useAuth';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/Index';
import { ActivityIndicator } from '@react-native-material/core';
import About from './pages/public/About';

const Stack = createStackNavigator();
export type AppScreens = {
  Index: undefined;
  About: undefined;
}

export default function Routes() {
  const { initLoading, isInRole, authenticated } = useAuth();
  return (
    <>
      {
        initLoading ?
          <NavigationContainer>
            <Stack.Navigator>

              <Stack.Screen name={"Index"} component={Index}></Stack.Screen>
              <Stack.Screen name={"About"} component={About}></Stack.Screen>


            </Stack.Navigator>
          </NavigationContainer>
          :
          <ActivityIndicator size={"large"} />
      }
    </>
  )
}
