import { TextInput, TextInputProps } from '@react-native-material/core'
import React from 'react'

function ThemeTextInput(props: TextInputProps) {
    return (
        <TextInput variant='standard' style={Object.assign({}, props.style, { width: "100%" })} {...props} />
    )
}

export default ThemeTextInput