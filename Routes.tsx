import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './libs/hook/useAuth';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/Index';
import About from './pages/public/About';
import useAuthorizeInit from './libs/hook/useAuthorizeInit';
import { ActivityIndicator } from 'react-native-paper';

const Stack = createStackNavigator();
export type AppScreens = {
  Index: undefined;
  About: undefined;
  Forbidden: undefined;
  Unauthorized: undefined;
}


function StackScreens() {
  const { initLoading } = useAuth();
  useAuthorizeInit();
  return (
    <>
      {
        initLoading ?
          <ActivityIndicator size={70} style={{ width: "100%", height: "100%" }} />
          :
          <Stack.Navigator>
            <Stack.Screen name={"Index"} component={Index}></Stack.Screen>
            <Stack.Screen name={"About"} component={About}></Stack.Screen>
          </Stack.Navigator>
      }
    </>
  );
}


export default function Routes() {
  return (
    <NavigationContainer fallback={<ActivityIndicator />}>
      <StackScreens />
    </NavigationContainer>
  );
}
