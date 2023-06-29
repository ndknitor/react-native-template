import { HelperText, TextInput, TextInputProps } from 'react-native-paper'
import React from 'react'
import { View } from 'react-native'
interface ThemeTextInputProps extends TextInputProps {
    helperText?: string;
}
function ThemeTextInput(props: ThemeTextInputProps) {
    return (
        <View style={{ width: "100%" }}>
            <TextInput
                mode='flat'
                style={[props.style, { width: "100%", backgroundColor : "transparent"}]}
                {...props} />
            <HelperText visible={props.helperText != undefined} type={props.error ? "error" : "info"}>
                {props.helperText}
            </HelperText>
        </View>
    )
}

export default ThemeTextInput