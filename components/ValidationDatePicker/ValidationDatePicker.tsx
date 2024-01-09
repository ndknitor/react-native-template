import { FieldMetaProps, FormikErrors } from 'formik';
import moment from 'moment';
import React, { useState } from 'react'
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DefaultTheme, HelperText, Text } from 'react-native-paper';
import Svg, { Path, SvgProps } from 'react-native-svg';
interface ValidationDatePickerProps {
    reset?: boolean;
    format?: string;
    placeholder?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    mode?: "date" | "time" | "datetime";
    androidVariant?: 'iosClone' | 'nativeAndroid';
    helperTextVisible?: boolean;
    helperText?: string;
    locate? : string;
    confirmText? : string;
    cancelText?: string;
    title?: string;
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
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>
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
    const getLabelColor = () => {
        if (meta.touched && Boolean(meta.error)) {
            return DefaultTheme.colors.error;
        }
        if (meta.value) {
            return "black";
        }
        return "gray";
    }
    return (
        <>
            <DatePicker
                {...props}
                modal
                open={opened}
                date={getValue()}
                androidVariant={props.androidVariant}
                confirmText={props.confirmText}
                locale={props.locate}
                maximumDate={props.maximumDate}
                minimumDate={props.minimumDate}
                title={props.title}
                cancelText={props.cancelText}
                mode={props.mode}
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

            <TouchableOpacity style={{ borderBottomWidth: 1.5, borderColor: meta.touched && Boolean(meta.error) ? DefaultTheme.colors.error : "gray", padding: 8, borderRadius: 8, width: "100%", flexDirection: "row" }} onPress={() => setOpened(true)}>
                <View style={{ width: "90%" }}>
                    <Text style={{ fontSize: 16, color: getLabelColor() }}>{meta.value ? moment(meta.value).format(props.format || "MM/DD/YYYY") : props.placeholder || "Pick a date"}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "flex-end" }}>
                    {
                        props.reset ?
                            meta.value ?
                                <TouchableOpacity onPress={() => props.formik.setFieldValue(props.name, undefined)}>
                                    <Exit />
                                </TouchableOpacity>
                                :
                                <Calendar />
                            :
                            <Calendar />
                    }
                </View>
            </TouchableOpacity>
            <HelperText visible={meta.touched && Boolean(meta.error)} type={meta.error ? "error" : "info"}>
                {meta.touched && meta.error}
            </HelperText>
        </>
    )
}

function Calendar(props: SvgProps) {
    return (
        <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={24}
            {...props}
        >
            <Path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200zm0-80h560v-400H200v400zm0-480h560v-80H200v80zm0 0v-80 80zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400zM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240z" />
        </Svg>
    )
}

function Exit(props: SvgProps) {
    return (
        <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={24}
            fill={"red"}
            strokeWidth={0.1}
            {...props}
        >
            <Path d="M336-307.692l144-144 144 144L652.308-336l-144-144 144-144L624-652.308l-144 144-144-144L307.692-624l144 144-144 144L336-307.692zM480.134-120q-74.673 0-140.41-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.134q0 74.673-28.339 140.41-28.34 65.737-76.922 114.365-48.582 48.627-114.257 76.993Q554.806-120 480.134-120zM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93zm0-320z" />
        </Svg>
    )
}


export default ValidationDatePicker