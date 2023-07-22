import React from 'react'
import { Keyboard } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'

function NoKeyboardTextInput(props: TextInputProps) {
    return (
        <TextInput {...props} onFocus={() => Keyboard.dismiss()} />
    )
}

export default NoKeyboardTextInput