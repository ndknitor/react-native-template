import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import Toast from 'react-native-root-toast';
import { API_BASE_URL, REQUEST_TIMEOUT } from "@env";
import colors from '../utils/colors';
import React from 'react';
import PageLoader from './PageLoader/PageLoader';
const appxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT | 3000,
    validateStatus: () => true
});
export interface InterceptorParams {
    loadingLock?: boolean;
}
export function setAuthorizationBearer(jwt?: string) {
    if (jwt) {
        appxios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    else {
        delete appxios.defaults.headers.common['Authorization'];
    }
}

const AxiosLoadingContext = createContext<{ loading: boolean }>({ loading: false });
export function useAxiosLoading() {
    return useContext(AxiosLoadingContext).loading;
}

export function AxiosInterceptor({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState(false);
    const [lockLoading, setLockLoading] = useState(false);
    useEffect(() => {
        const beforeRequest = (config: InternalAxiosRequestConfig) => {
            setLoading(true);
            const params = config.params as InterceptorParams;
            if (params.loadingLock) {
                setLockLoading(true);
            }
            return config;
        }
        const requestError = (error: any) => {
            return Promise.reject(error);
        }
        const onResponse = (response: AxiosResponse<any, any>) => {
            setLoading(false);
            console.log(`Path: ${response.config.url}; Method:${response.config.method}; Status: ${response.status};
            Body:${response.config.data}`);
            const params = response.config.params as InterceptorParams;
            if (params.loadingLock) {
                setLockLoading(false);
            }
            return response;
        }
        const onResponseError = (error: AxiosError) => {
            setLoading(false);
            const params = error.config?.params as InterceptorParams;
            if (params.loadingLock) {
                setLockLoading(false);
            }
            let message = "";
            if (error.code == "ERR_NETWORK") {
                message = "Lỗi kết nối với máy chủ, vui lòng thử lại sau"
            }
            else if (error.code == "ECONNABORTED") {
                message = "Lỗi kết nối mạng, vui lòng thử lại sau";
            }
            Toast.show(message, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: colors.error,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
            return Promise.reject(error);
        }
        appxios.interceptors.request.use(beforeRequest, requestError);
        const interceptor = appxios.interceptors.response.use(onResponse, onResponseError);
        return () => appxios.interceptors.response.eject(interceptor);
    }, [])
    return (
        <AxiosLoadingContext.Provider value={{ loading }}>
            <PageLoader loading={lockLoading} />
            {children}
        </AxiosLoadingContext.Provider>
    )
}


export default appxios;
