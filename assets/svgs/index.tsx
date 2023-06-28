import React from 'react'
import { ImageURISource } from 'react-native';
import SvgUri, { SvgUriProps } from 'react-native-svg-uri';

function Ruby(props: SvgUriProps) {
    const source: ImageURISource = require('./assets/ruby.svg');
    return (
        <SvgUri {...props} source={source} />
    );
}
const AssetSvg = {
    Ruby
};

export default AssetSvg