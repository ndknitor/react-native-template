import { useEffect, useState } from "react";
import useScreenDimensions from "./useScreenDimensions";

export default function useMediaQuery() {
    const window = useScreenDimensions();
    const [sm, setSM] = useState(false);
    const [md, setMD] = useState(false);
    const [lg, setLG] = useState(false);
    const [xl, setXL] = useState(false);
    const [xl2, setXL2] = useState(false);
    useEffect(() => {
        setSM(window.width >= 640);
        setMD(window.width >= 768);
        setLG(window.width >= 1024);
        setXL(window.width > 1280);
        setXL2(window.width >= 1536);
    }, [window]);
    return { sm, md, lg, xl, xl2 };
}