import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/Index';
import About from './pages/public/About';
import Loading from './components/Loading/Loading';
import { useInitEffect } from 'ndknitor-ts/hooks';
import storage from './utils/storage';
import fetcker from './utils/fetcker';
import LocalStorageKey from './objects/enums/LocalStorageKey';
import packages from './package.json';
const Stack = createStackNavigator();
export type AppScreens = {
  Index: undefined;
  About: undefined;
  Forbidden: undefined;
  Unauthorized: undefined;
}
function StackScreens() {
  useInitEffect(() => {
    fetcker.setAuthorizationHeader(storage.getString(LocalStorageKey.Jwt));
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
      prefixes: [`${packages.name}://`],
      config: {
        initialRouteName: 'Index',
        screens: {
          Index: {
            path: 'index'
          },
          About: {
            path: 'about/:id',
            parse: {
              id: (id) => Number(id)
            }
          }
        }
      }
    }}>
      <StackScreens />
    </NavigationContainer>
  );
}
