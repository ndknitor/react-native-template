import React from 'react';
import Routes from './Routes';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import AuthorizeContextProvider from './csr-authorization/AuthorizeContextProvider';
import { RootSiblingParent } from 'react-native-root-siblings';
import { AppxiosInterceptor } from './interceptors/AppxiosInterceptor';

// import OneSignal from 'react-native-onesignal';
// import { ONESIGNAL_APP_ID } from '@env';

// OneSignal.setAppId(ONESIGNAL_APP_ID);
// OneSignal.promptForPushNotificationsWithUserResponse();
// OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
//     console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
//     let notification = notificationReceivedEvent.getNotification();
//     console.log("notification: ", notification);
//     const data = notification.additionalData
//     console.log("additionalData: ", data);
//     notificationReceivedEvent.complete(notification);
// });
// OneSignal.setNotificationOpenedHandler(notification => {
//     console.log("OneSignal: notification opened:", notification);
// });



function App(): JSX.Element {
  return (
    <RootSiblingParent>
      <AuthorizeContextProvider unauthorized={"Unauthorized"} forbidden={'Forbidden'} onInitAuthorize={() => false}>
        <GlobalContextProvider>
          <AppxiosInterceptor>
            <Routes />
          </AppxiosInterceptor>
        </GlobalContextProvider>
      </AuthorizeContextProvider>
    </RootSiblingParent>
  );
}

export default App;
