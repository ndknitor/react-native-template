import { useAsyncEffect } from "ndknitor-ts/hooks";
import React from "react";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react"
class AuthorizeStore {
    initLoading: boolean = true;
    setInitLoading: Dispatch<SetStateAction<boolean>> = () => { };

    unauthorized: string = "";
    forbidden: string = "";

    authenticated: boolean = false;
    roles: string[] = [];
    setAuthorize: (scheme: string[] | boolean) => void = () => { };
}
const useProvider: (u: string, f: string, init: () => string[] | boolean | Promise<string[]> | Promise<boolean>) => AuthorizeStore = (u, f, init: () => string[] | boolean | Promise<string[]> | Promise<boolean>) => {
    const [initLoading, setInitLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [roles, setRoles] = useState<string[]>([]);

    const [unauthorized, setUnauthorized] = useState("");
    const [forbidden, setForbidden] = useState("");

    useAsyncEffect(async () => {
        setAuthorize(await init())
        setForbidden(f);
        setUnauthorized(u);
        if (initLoading) {
            setInitLoading(false);
        }
    }, []);

    const setAuthorize = (scheme: string[] | boolean) => {
        if (!(typeof scheme == "boolean")) {
            setAuthenticated(true);
            setRoles(scheme);
        }
        else {
            setAuthenticated(scheme);
            setRoles([]);
        }
    }
    return {
        initLoading,
        setInitLoading,

        authenticated,
        roles,
        setAuthorize,
        unauthorized,
        forbidden
    };
}
export const AuthorizeContext = createContext<AuthorizeStore>(new AuthorizeStore());
interface AuthorizeProviderProps extends PropsWithChildren {
    unauthorized: string;
    forbidden: string;
    onInitAuthorize: () => string[] | boolean | Promise<string[]> | Promise<boolean>;
}
export default function AuthorizeContextProvider(props: AuthorizeProviderProps) {

    return (
        <AuthorizeContext.Provider value={useProvider(props.unauthorized, props.forbidden, props.onInitAuthorize)} >
            {props.children}
        </AuthorizeContext.Provider>
    );
}
