import { FieldMetaProps } from 'formik';
import moment from 'moment';
import React, { useState } from 'react'
import DatePicker, { DatePickerProps } from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
interface ValidationDatePickerProps {
    name : string;
    reset? : boolean;
    format?: string;
    placeholder?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    mode?: "date" | "time" | "datetime";
    onConfirm? : (date : Date) => void | Promise<void>;
    onCancel? : () => void | Promise<void>;
    onReset?: () => void | Promise<void>;
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
function ValidationDatePicker(props: ValidationDatePickerProps) {
    const meta = props.formik.getFieldMeta(props.name);
    const [opened, setOpened] = useState(false);
    return (
        <>
            <DatePicker
                {...props}
                modal
                mode={props.mode}
                open={opened}
                date={new Date()}
                onConfirm={async (date) => {
                    props.onConfirm && await props.onConfirm(date);
                    props.formik.handleChange(props.name);
                    setOpened(false);
                }}
                onCancel={async () => {
                    props.onCancel && await props.onCancel();
                    setOpened(false);
                }}
            />

            {/* <TouchableOpacity onPress={() => setOpened(true)}>
                <Text style={{ color: meta.value ? "black" : "gray" }}>{props.me ? moment(props.date).format(props.format || "MM/DD/YYYY") : props.placeholder}</Text>
            </TouchableOpacity> */}
        </>
    )
}

export default ValidationDatePicker