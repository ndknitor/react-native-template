import React, { useState } from 'react'
import FadeTransition from '../FadeTransition/FadeTransition'
import useEffectOnce from '../../libs/hook/useEffectOnce';
import { ViewProps } from 'react-native';
interface FadeInViewProps extends ViewProps {
    duration?: number;
}
function FadeInView(props: FadeInViewProps) {
    const [showed, setShowed] = useState(false);
    useEffectOnce(() => {
        setTimeout(() => setShowed(true), 300);
    })
    return (
        <FadeTransition {...props} showed={showed} duration={props.duration || 300}>
            {props.children}
        </FadeTransition>
    )
}

export default FadeInView