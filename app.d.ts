
declare module '@env' {
    export const API_BASE_URL: string;
    export const REQUEST_TIMEOUT: number;
    export const ONESIGNAL_APP_ID: string;
}
declare module '*.png' {
    const value: ImageSourcePropType;
    export default value;
}

declare module '*.jpg' {
    const value: ImageSourcePropType;
    export default value;
}