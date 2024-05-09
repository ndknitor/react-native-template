import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './pages/Index';
import About from './pages/public/About';
import Loading from './components/Loading/Loading';
import packages from './package.json';
const Stack = createStackNavigator();
function StackScreens() {
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