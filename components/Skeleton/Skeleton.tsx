import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface SkeletonProps {
    width?: number | Animated.Value | Animated.AnimatedInterpolation<string | number> | "auto" | `${number}%` | Animated.WithAnimatedObject<Animated.AnimatedNode> | null | undefined;
    height?: number | Animated.Value | Animated.AnimatedInterpolation<string | number> | "auto" | `${number}%` | Animated.WithAnimatedObject<Animated.AnimatedNode> | null | undefined;
    borderRadius?: number;
    duration?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width,
    height,
    borderRadius = 0,
    duration = 1000,
}) => {
    const pulseAnimation = useRef(new Animated.Value(0)).current;

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1,
                    duration: duration / 2,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 0,
                    duration: duration / 2,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    useEffect(() => {
        startPulseAnimation();
    }, []);

    const interpolatedOpacity = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    const skeletonStyle = {
        width,
        height,
        borderRadius,
        backgroundColor: '#E0E0E0',
        opacity: interpolatedOpacity,
    };

    return <Animated.View style={[styles.skeleton, skeletonStyle]} />;
};

const styles = StyleSheet.create({
    skeleton: {
        alignSelf: 'stretch',
    },
});

export default Skeleton;
