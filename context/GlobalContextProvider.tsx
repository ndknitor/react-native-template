import React from "react";
import { createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";
import Languages from "../utils/language";

interface ContextProps {
    languages: typeof Languages.en;
    setISO: Dispatch<SetStateAction<keyof Languages>>;
}

const GlobalContext = createContext<ContextProps>({
    languages: Languages.en,
    setISO: (): keyof Languages => "en"
})

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
    const [iso, setISO] = useState<keyof Languages>("en");

    return (
        <GlobalContext.Provider value={{ setISO, languages: Languages[iso] }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);