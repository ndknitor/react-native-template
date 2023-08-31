import { useContext, useEffect } from "react";
import { AuthorizeContext } from "../../context/AuthorizeContextProvider";

export default function useAuthorizeInit() {
    const { setInitLoading, initLoading } = useContext(AuthorizeContext);
    useEffect(() => {
        if (initLoading) {
            setInitLoading(false);
        }
    },[]);
}