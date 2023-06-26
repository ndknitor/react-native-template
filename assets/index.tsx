import { Image, ImageResizeMode, ImageSourcePropType } from "react-native";
import ScreenShotSource from "./images/ScreenShot.png";
import React from "react";

export function ScreenShot(props: AssetProps) {
    return (
        <Asset source={ScreenShotSource} {...props} />
    )
}


const Asset = (props: AssetSourceProps) => {
    return (
        <Image source={props.source} style={{ width: props.width, height: props.height }} resizeMode={props.resizeMode} resizeMethod={props.resizeMethod} />
    )
}
Asset.ScreenShot = ScreenShot;

export default Asset;

//////////////////////////////////////////
interface AssetSourceProps extends AssetProps {
    source: ImageSourcePropType;
}
interface AssetProps {
    resizeMode?: ImageResizeMode;
    resizeMethod?: "auto" | "resize" | "scale" | undefined;
    width?: number;
    height?: number;
}



