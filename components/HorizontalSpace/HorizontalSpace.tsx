import React from 'react'
import { View } from 'react-native';
interface HorizontalSpaceProps {
    space?: number;
}
function HorizontalSpace(props: HorizontalSpaceProps) {
    return (
        <View style={{ marginTop: props.space || 10 }} />
    )
}

export default HorizontalSpace