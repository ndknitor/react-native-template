import React, { useEffect, useState } from 'react';
import { Animated, ViewProps } from 'react-native';

interface ScaleFadeTransitionProps extends ViewProps {
  duration?: number;
  initShow?: boolean;
  showed: boolean;
  onHideComplete?: () => void;
  onShowComplete?: () => void;
}

function ScaleFadeTransition(props: ScaleFadeTransitionProps) {
  const defaultDuration = 300;

  const [display, setDisplay] = useState(props.initShow || false);
  const [opacity] = useState(new Animated.Value(1));
  const [scale] = useState(new Animated.Value(1)); // New scale Animated.Value

  const animationHide = Animated.parallel([
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: true,
      duration: props.duration || defaultDuration,
    }),
    Animated.timing(scale, { // Scale animation for hide
      toValue: 0,
      useNativeDriver: true,
      duration: props.duration || defaultDuration,
    }),
  ]);

  const animationShow = Animated.parallel([
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: props.duration || defaultDuration,
    }),
    Animated.timing(scale, { // Scale animation for show
      toValue: 1,
      useNativeDriver: true,
      duration: props.duration || defaultDuration,
    }),
  ]);

  useEffect(() => {
    if (props.showed) {
      animationHide.stop();
      setDisplay(true);
      animationShow.start(() => props.onShowComplete && props.onShowComplete());
    } else {
      animationShow.stop(); // Stop the show animation before starting the hide animation
      animationHide.start(() => {
        setDisplay(false);
        props.onHideComplete && props.onHideComplete();
      });
    }
  }, [props.showed]);

  return (
    <Animated.View
      {...props}
      style={Object.assign({}, props.style, {
        opacity: opacity,
        transform: [{ scale: scale }], // Apply the scale transform
        display: display ? 'flex' : 'none',
      })}
    >
      {props.children}
    </Animated.View>
  );
}

export default ScaleFadeTransition;
