
import { AxiosRequestConfig } from 'axios';
import { InterceptorParams } from './components/AxiosInterceptor';

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
    export interface InternalAxiosRequestConfig<any> {
        loadAction?: InterceptorParams;
    }
}