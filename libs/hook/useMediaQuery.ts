import { useEffect, useState } from "react";
import useScreenDimensions from "./useScreenDimensions";

export default function useMediaQuery(sizeCover: boolean | true) {
    const window = useScreenDimensions();
    const [sm, setSM] = useState(false);
    const [md, setMD] = useState(false);
    const [lg, setLG] = useState(false);
    const [xl, setXL] = useState(false);
    const [xl2, setXL2] = useState(false);
    useEffect(() => {
        if (!sizeCover) {
            setSM(window.width >= 640 && window.width < 768);
            setMD(window.width >= 768 && window.width < 1024);
            setLG(window.width >= 1024 && window.width < 1280);
            setXL(window.width >= 1280 && window.width < 1536);
            setXL2(window.width >= 1536);
        }
        else {
            setSM(window.width >= 640);
            setMD(window.width >= 768);
            setLG(window.width >= 1024);
            setXL(window.width >= 1280);
            setXL2(window.width >= 1536);
        }
    }, [window]);
    return { sm, md, lg, xl, xl2 };
}