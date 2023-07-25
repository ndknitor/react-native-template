import React, { useState } from 'react'
import { ViewProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { randomInt } from '../../libs/functions';
interface FadeInViewProps extends ViewProps {
    duration?: number;
}
function FadeInView(props: FadeInViewProps) {
    return (
        <Animated.View {...props} entering={FadeIn.duration(randomInt(200, 1200))} >
            {props.children}
        </Animated.View>
    )
}

export default FadeInView