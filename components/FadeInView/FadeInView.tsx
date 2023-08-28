import React from 'react'
import { randomInt } from '../../libs/functions';
import Animated, { AnimateProps, FadeIn } from 'react-native-reanimated';
import { ViewProps } from 'react-native';
interface FadeInViewProps extends AnimateProps<ViewProps> {
    duration?: number;
}
function FadeInView(props: FadeInViewProps) {
    return (
        <Animated.View {...props} entering={FadeIn.duration(randomInt(600, 1200))} >
            {props.children}
        </Animated.View>
    )
}

export default FadeInView