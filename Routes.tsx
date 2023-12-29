import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/Index';
import About from './pages/public/About';
import Loading from './components/Loading/Loading';
import { useInitEffect } from 'ndknitor-ts/hooks';
import fetcker from './utils/fetcker';
const Stack = createStackNavigator();
export type AppScreens = {
  Index: undefined;
  About: undefined;
  Forbidden: undefined;
  Unauthorized: undefined;
}
function StackScreens() {
  useInitEffect(async () => {

  });
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Index"} component={Index}></Stack.Screen>
      <Stack.Screen name={"About"} component={About}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer fallback={<Loading />} linking={{
      prefixes: ['reactnativetemplate://'],
      config: {
        initialRouteName: 'Index',
        screens: {
          Index: {
            path: 'index'
          },
          About: {
            path: 'about'
          }
        }
      }
    }}>
      <StackScreens />
    </NavigationContainer>
  );
}
