import { TextInput, TextInputProps } from '@react-native-material/core'
import React from 'react'

function FullWidthTextInput(props: TextInputProps) {
    return (
        <TextInput style={Object.assign({}, props.style, { width: "100%" })} {...props} />
    )
}

export default FullWidthTextInput