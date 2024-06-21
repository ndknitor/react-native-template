import React, { useEffect } from 'react';
import Routes from './Routes';
import { RootSiblingParent } from 'react-native-root-siblings';
import fetcker from './utils/fetcker';
import storage from './utils/storage';
import LocalStorageKey from './objects/enums/LocalStorageKey';

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
  useEffect(() => {
    fetcker.setAuthorizationHeader(storage.getString(LocalStorageKey.Jwt));
  });
  return (
    <RootSiblingParent>
      <Routes />
    </RootSiblingParent>
  );
}

export default App;
