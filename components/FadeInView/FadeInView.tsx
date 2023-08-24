import React from 'react'
import { randomInt } from '../../libs/functions';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { AnimateProps, FadeIn } from 'react-native-reanimated';
import { ViewProps } from 'react-native';
interface FadeInViewProps extends AnimateProps<ViewProps> {
    duration?: number;
}
function FadeInView(props: FadeInViewProps) {
    return (
        <View {...props} entering={FadeIn.duration(randomInt(200, 1200))} >
            {props.children}
        </View>
    )
}

export default FadeInView