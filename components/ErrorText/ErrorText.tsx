import { Text, TextProps } from '@react-native-material/core'
import React from 'react'
interface ErrorTextProps extends TextProps {

}
function ErrorText(props: ErrorTextProps) {
    return (
        <Text style={{ color: "red", display: props.children ? "flex" : "none" }}>{props.children}</Text>
    )
}

export default ErrorText