import React from "react";
import { createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
})

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
    const [userId, setUserId] = useState('');

    return (
        <GlobalContext.Provider value={{ userId, setUserId }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);