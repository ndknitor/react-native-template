import { InterceptorParams } from './components/AxiosInterceptor';
import { ImageSourcePropType } from 'react-native';
declare module '*.png' {
    const value: ImageSourcePropType;
    export default value;
}
declare module '*.jpg' {
    const value: ImageSourcePropType;
    export default value;
}
declare module 'axios' {
    export interface AxiosRequestConfig {
        loadAction?: InterceptorParams;
    }
    export interface InternalAxiosRequestConfig {
        loadAction?: InterceptorParams;
    }
}
