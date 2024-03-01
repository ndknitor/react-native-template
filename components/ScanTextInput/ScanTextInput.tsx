import React, { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
interface ScanTextInputProps extends TextInputProps {
    onScanSubmit: (e: string) => void | Promise<void>;
}
function ScanTextInput(props: ScanTextInputProps) {
    const [value, setValue] = useState("");
    return (
        <TextInput
            value={props.value || value}
            onChangeText={props.onChangeText || setValue}
            showSoftInputOnFocus={false}
            blurOnSubmit={false}
            autoFocus={props.autoFocus || true}
            style={{ width: 0, height: 0, position: "absolute", zIndex: -9999, top: -99 }}
            onSubmitEditing={(e) => {
                props.onSubmitEditing && props.onSubmitEditing(e);
                props.onScanSubmit(value);
                setValue("");
            }}
            {...props}
        />
    )
}

export default ScanTextInput