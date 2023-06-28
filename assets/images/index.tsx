import { Image, ImageResizeMode, ImageSourcePropType } from "react-native";
import ScreenShotSource from "./assets/ScreenShot.png";
import React from "react";

export function ScreenShot(props: AssetProps) {
    return (
        <AssetImage source={ScreenShotSource} {...props} />
    )
}


const AssetImage = (props: AssetSourceProps) => {
    return (
        <Image source={props.source} style={{ width: props.width, height: props.height }} resizeMode={props.resizeMode} resizeMethod={props.resizeMethod} />
    )
}
AssetImage.ScreenShot = ScreenShot;

export default AssetImage;

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



