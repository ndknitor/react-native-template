import React, { useState } from 'react'
import { Animated, ViewProps } from 'react-native';
import useEffectOnce from '../../libs/hook/useEffectOnce';
interface ZoomInViewProps extends ViewProps {
    duration?: number;
}
function ZoomInView(props: ZoomInViewProps) {
    const deafultDuration = 300;
    const [scale] = useState(new Animated.Value(0));
    const animationShow = Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: true,
        duration: props.duration || deafultDuration
    });
    useEffectOnce(() => {
        setTimeout(() => animationShow.start(), 100);
    });
    return (
        <Animated.View
            {...props}
            style={[props.style, { transform: [{ scale: scale }] }]}>
            {props.children}
        </Animated.View>
    )
}

export default ZoomInView