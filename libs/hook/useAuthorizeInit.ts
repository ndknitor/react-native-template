import { useContext } from "react";
import useEffectOnce from "./useEffectOnce";
import { AuthorizeContext } from "../../context/AuthorizeContextProvider";

export default function useAuthorizeInit() {
    const { setInitLoading, initLoading } = useContext(AuthorizeContext);
    useEffectOnce(() => {
        if (initLoading) {
            setInitLoading(false);
        }
    });
}