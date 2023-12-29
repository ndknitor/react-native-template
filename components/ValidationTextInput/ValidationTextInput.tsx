import { HelperText, TextInput, TextInputProps } from 'react-native-paper'
import React from 'react'
import { View } from 'react-native'
import { FieldMetaProps } from 'formik';
interface ValidationTextInputProps extends TextInputProps {
    name: string;
    formik:
    {
        handleChange: {
            (e: React.ChangeEvent<any>): void;
            <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
        };
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void;
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
        };
        getFieldMeta: (name: string) => FieldMetaProps<any>;
    }
}
function ValidationTextInput(props: ValidationTextInputProps) {
    const meta = props.formik.getFieldMeta(props.name);
    return (
        <View style={{ width: "100%" }}>
            <TextInput
                onChangeText={props.formik.handleChange(props.name)}
                onBlur={props.formik.handleBlur(props.name)}
                error={meta.touched && Boolean(meta.error)}
                value={meta.value}
                mode='flat'
                style={[props.style, { width: "100%", backgroundColor: "transparent" }]}
                {...props} />
            <HelperText visible={meta.touched && Boolean(meta.error)} type={meta.error ? "error" : "info"}>
                {meta.touched && meta.error}
            </HelperText>
        </View>
    )
}

export default ValidationTextInput


