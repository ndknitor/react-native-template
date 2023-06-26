import React from 'react';
import Routes from './Routes';
import { AxiosInterceptor } from './components/AxiosInterceptor';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import AuthorizeContextProvider from './context/AuthorizeContextProvider';
import { RootSiblingParent } from 'react-native-root-siblings';

function App(): JSX.Element {


  return (
    <RootSiblingParent>
      <AxiosInterceptor>
        <AuthorizeContextProvider>
          <GlobalContextProvider>
            <Routes />
          </GlobalContextProvider>
        </AuthorizeContextProvider>
      </AxiosInterceptor>
    </RootSiblingParent>
  );
}

export default App;
