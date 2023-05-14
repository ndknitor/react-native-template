import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './Routes';
import { AxiosInterceptor } from './components/AxiosInterceptor';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import AuthorizeContextProvider from './context/AuthorizeContextProvider';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <AxiosInterceptor>
        <AuthorizeContextProvider>
          <GlobalContextProvider>
            <StatusBar style="auto" />
            <Routes />
          </GlobalContextProvider>
        </AuthorizeContextProvider>
      </AxiosInterceptor>
    </RootSiblingParent>
  );
}