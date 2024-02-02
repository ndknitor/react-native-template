import Config from "react-native-config";

export const API_BASE_URL: string = Config.API_BASE_URL as string;
export const REQUEST_TIMEOUT: number = parseInt(Config.REQUEST_TIMEOUT as string);
export const MAXPAGE: number = parseInt(Config.MAXPAGE as string) ;

export const ONESIGNAL_APP_ID: string = Config.ONESIGNAL_APP_ID as string;