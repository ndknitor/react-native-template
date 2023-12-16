import { Image, ImageProps } from "react-native";
import Ruby from "./svg/Ruby";
import React from "react";
export const AssetSvg = {
    Ruby
};

export const AssetImage = {
    Ruby: (props: ImageProps) => <Image source={require('./images/ruby.png')} resizeMode='center' {...props} />
};

