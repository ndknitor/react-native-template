import axios, { AxiosError, AxiosResponse } from 'axios';
import { PropsWithChildren, useEffect } from 'react'
import Toast from 'react-native-root-toast';
import { API_BASE_URL, REQUEST_TIMEOUT } from "@env"
const appxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT | 3000,
    validateStatus: () => true
});
export function setAuthorizationBearer(jwt?: string) {
    if (jwt) {
        appxios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    else {
        delete appxios.defaults.headers.common['Authorization'];
    }
}

export function AxiosInterceptor({ children }: PropsWithChildren) {
    useEffect(() => {
        const beforeRequest = (config: any) => {
            return config;
        }
        const requestError = (error: any) => {
            console.log(error);
            return Promise.reject(error);
        }
        const onResponse = (response: AxiosResponse<any, any>) => {
            console.log(`Path: ${response.config.url}; Method:${response.config.method}; Body:${response.config.data}; Status: ${response.status}`);
            return response;
        }
        const onResponseError = (error: AxiosError) => {
            if (error.code == "ERR_NETWORK" || error.code == "ECONNABORTED") {
                Toast.show('Lỗi kết nối mạng, vui lòng thử lại sau', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: "red",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            }
            console.log(error);
            return Promise.reject(error);
        }
        appxios.interceptors.request.use(beforeRequest, requestError);
        const interceptor = appxios.interceptors.response.use(onResponse, onResponseError);
        return () => appxios.interceptors.response.eject(interceptor);
    }, [])
    return (
        <>
            {children}
        </>
    )
}


export default appxios;
