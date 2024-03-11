import React, { RefObject, useEffect, useRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import useRouter from '../../utils/useRouter';
interface ScanTextInputProps extends TextInputProps {
    onScanSubmit: (e: string) => void | Promise<void>;
    forceFocus?: boolean;
}
function ScanTextInput(props: ScanTextInputProps) {
    const [value, setValue] = useState("");
    const navigation = useRouter();
    const textInputRef = useRef<TextInput>(null);

    useEffect(() => {
        const listener = navigation.addListener("focus", e => {
            setTimeout(() => textInputRef.current?.focus(), 300);
        });
        return () => {
            navigation.removeListener("focus", listener);
        }
    }, []);

    return (
        <TextInput
            value={value}
            onChangeText={props.onChangeText || setValue}
            showSoftInputOnFocus={false}
            blurOnSubmit={false}
            autoFocus={props.autoFocus || true}
            style={{ width: 0, height: 0, position: "absolute", zIndex: -9999, top: -99 }}
            onSubmitEditing={async (e) => {
                props.onSubmitEditing && props.onSubmitEditing(e);
                await props.onScanSubmit(value);
                setValue("");
            }}
            {...props}
            ref={textInputRef}
        />
    )
}

export default ScanTextInput