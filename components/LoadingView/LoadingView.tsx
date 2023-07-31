import React, { useEffect, useRef } from 'react';
import { View, Animated, ViewProps, ViewStyle, StyleProp } from 'react-native';

interface LoadingViewProps extends ViewProps {
    placeholder?: React.ReactElement;
    placeHolderContainerStyle?: StyleProp<ViewStyle>;
    childrenContainerStyle?: StyleProp<ViewStyle>;
    loading: boolean;
    duration?: number;
}

const LoadingView: React.FC<LoadingViewProps> = (props) => {
    const placeholderFadeAnim = useRef(new Animated.Value(1)).current;
    const contentFadeAnim = useRef(new Animated.Value(0)).current;
    const duration = 100;
    useEffect(() => {
        if (props.loading) {
            Animated.parallel([
                Animated.timing(placeholderFadeAnim, {
                    toValue: 1,
                    duration: props.duration || duration,
                    useNativeDriver: true,
                }),
                Animated.timing(contentFadeAnim, {
                    toValue: 0,
                    duration: props.duration || duration,
                    useNativeDriver: true,
                })
            ]);
        } else {
            Animated.parallel([
                Animated.timing(contentFadeAnim, {
                    toValue: 1,
                    duration: props.duration || duration,
                    useNativeDriver: true,
                }),
                Animated.timing(placeholderFadeAnim, {
                    toValue: 0,
                    duration: props.duration || duration,
                    useNativeDriver: true,
                })
            ]);
        }
    }, [placeholderFadeAnim, contentFadeAnim, props.loading]);

    return (
        <View style={[props.style]}>
            <Animated.View style={[props.placeHolderContainerStyle, { position: "absolute", opacity: placeholderFadeAnim }]}>
                {props.placeholder}
            </Animated.View>
            <Animated.View style={[props.childrenContainerStyle, { position: "absolute", opacity: contentFadeAnim }]}>
                {props.children}
            </Animated.View>
        </View>
    );
};

export default LoadingView;
