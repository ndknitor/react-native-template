import React, { useState } from 'react'
import FadeTransition from '../FadeTransition/FadeTransition'
import useEffectOnce from '../../libs/hook/useEffectOnce';
import { Animated, ViewProps } from 'react-native';
interface FadeInViewProps extends ViewProps {
    duration?: number;
}
function FadeInView(props: FadeInViewProps) {
    const deafultDuration = 300;
    const [opacity] = useState(new Animated.Value(0));
    const animationShow = Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: props.duration || deafultDuration
    });
    useEffectOnce(() => {
        setTimeout(() => animationShow.start(), 300);
    });
    return (
        <Animated.View
            {...props}
            style={Object.assign({}, props.style,
                {
                    opacity: opacity,
                }
            )}>
            {props.children}
        </Animated.View>
    )
}

export default FadeInView