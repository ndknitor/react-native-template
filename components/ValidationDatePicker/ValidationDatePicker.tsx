import { FieldMetaProps } from 'formik';
import moment from 'moment';
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HelperText, Text } from 'react-native-paper';
interface ValidationDatePickerProps {
    reset?: boolean;
    format?: string;
    placeholder?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    mode?: "date" | "time" | "datetime";
    helperTextVisible? : boolean;
    helperText? : string;
    cancelText? : string;
    title? : string;
    onConfirm?: (date: Date) => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    onReset?: () => void | Promise<void>;
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
        setFieldValue : (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void>
    }
}
function ValidationDatePicker(props: ValidationDatePickerProps) {
    const [opened, setOpened] = useState(false);
    const meta = props.formik.getFieldMeta(props.name);

    const getValue = () => {
        if (meta.value) {
            return meta.value;
        }
        const currentDate = new Date();
        if (props.maximumDate && props.maximumDate <= currentDate) {
            return props.maximumDate;
        }
        if (props.minimumDate && props.minimumDate >= currentDate) {
            return props.minimumDate;
        }
        return currentDate;
    }
    return (
        <>
            <DatePicker
                {...props}
                modal
                open={opened}
                date={getValue()}
                onConfirm={async (date) => {
                    props.onConfirm && await props.onConfirm(date);
                    props.formik.setFieldValue(props.name, date);
                    setOpened(false);
                }}
                onCancel={async () => {
                    props.onCancel && await props.onCancel();
                    setOpened(false);
                }}
            />

            <TouchableOpacity onPress={() => setOpened(true)}>
                <Text style={{ color: meta.value ? "black" : "gray" }}>{meta.value ? moment(meta.value).format(props.format || "MM/DD/YYYY") : props.placeholder}</Text>
            </TouchableOpacity>
            <HelperText visible={meta.touched && Boolean(meta.error)} type={meta.error ? "error" : "info"}>
                {meta.touched && meta.error}
            </HelperText>
        </>
    )
}

export default ValidationDatePicker