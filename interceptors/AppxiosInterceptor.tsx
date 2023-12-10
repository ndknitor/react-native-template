import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { API_BASE_URL, REQUEST_TIMEOUT } from "@env";
import React from 'react';
import PageLoader from '../components/PageLoader/PageLoader';
import { useGlobalContext } from '../context/GlobalContextProvider';
import Message from '../utils/Message';
const appxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT | 3000,
    validateStatus: () => true
});
export default appxios;

export function setAuthorizationBearer(jwt?: string) {
    if (jwt) {
        appxios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    else {
        delete appxios.defaults.headers.common['Authorization'];
    }
}

export const useAppxiosLoading = () => useContext(AxiosLoadingContext).loading;

const AxiosLoadingContext = createContext<{ loading: boolean }>({ loading: false });

export function AppxiosInterceptor({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState(false);
    const { languages } = useGlobalContext();
    useEffect(() => {
        const beforeRequest = (config: InternalAxiosRequestConfig<any>) => {
            setLoading(true);
            return config;
        }
        const requestError = (error: any) => {
            return Promise.reject(error);
        }
        const onResponse = (response: AxiosResponse<any, any>) => {
            setLoading(false);
            console.log(`Path: ${response.config.url}; Method:${response.config.method}; Status: ${response.status};
            Body:${response.config.data}`);
            return response;
        }
        const onResponseError = (error: AxiosError) => {
            setLoading(false);

            let message = "";
            if (error.code == "ERR_NETWORK") {
                message = languages.axios.serverError;
            }
            else if (error.code == "ECONNABORTED") {
                message = languages.axios.internetError;
            }
            Message.error(message);
            return Promise.resolve(error);
        }
        appxios.interceptors.request.use(beforeRequest, requestError);
        const interceptor = appxios.interceptors.response.use(onResponse, onResponseError);
        return () => appxios.interceptors.response.eject(interceptor);
    }, [languages])
    return (
        <AxiosLoadingContext.Provider value={{ loading }}>
            {children}
        </AxiosLoadingContext.Provider>
    )
}