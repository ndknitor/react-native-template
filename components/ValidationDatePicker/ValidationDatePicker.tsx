// import { FieldMetaProps, FormikErrors } from "formik";
// import moment from "moment";
// import React, { useState } from "react";
// import { TouchableOpacity, View, Text } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { DefaultTheme, HelperText } from "react-native-paper";
// import Svg, { Path, SvgProps } from "react-native-svg";

// interface ValidationDatePickerProps {
//     name: string;
//     hideReset?: boolean;
//     format?: string;
//     placeholder?: string;
//     maximumDate?: Date;
//     minimumDate?: Date;
//     mode?: "date" | "time" | "datetime";
//     onConfirm?: (date: Date) => void;
//     onCancel?: () => void;
//     onReset?: () => void;
//     formik:
//     {
//         handleChange: {
//             (e: React.ChangeEvent<any>): void;
//             <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
//         };
//         handleBlur: {
//             (e: React.FocusEvent<any, Element>): void;
//             <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
//         };
//         getFieldMeta: (name: string) => FieldMetaProps<any>;
//         setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>
//     }
// }


// function ValidationDatePicker(props: ValidationDatePickerProps) {
//     const blankLabel = props.placeholder || "Chọn ngày"
//     const [showModal, setShowModal] = useState(false);
//     const [value, setValue] = useState<Date>();
//     const meta = props.formik.getFieldMeta(props.name);

//     return (
//         <>
//             <View
//                 style={{
//                     borderBottomWidth: meta.touched && Boolean(meta.error) ? 2 : 0.75,
//                     flexDirection: "row",
//                     width: "100%",
//                     padding: 5,
//                     paddingLeft: 16,
//                     borderColor: meta.touched && Boolean(meta.error) ? DefaultTheme.colors.error : "black",
//                 }}>
//                 <TouchableOpacity
//                     onPress={() => setShowModal(true)}
//                     style={{
//                         //borderWidth: 1,
//                         height: "100%",
//                         flexDirection: "row",
//                         width: "90%",
//                         alignItems: "center",
//                         justifyContent: "flex-start"
//                     }}>
//                     <Text style={{
//                         color: value == undefined ? "gray" : "black",
//                         fontSize: 16,
//                         marginRight: 7
//                     }}>{value != undefined ?
//                         props.format ?
//                             moment(value).format(props.format) :
//                             moment(value).format("DD/MM/YYYY") :
//                         props.format || "DD/MM/YYYY"}
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => setShowModal(true)}
//                     style={{
//                         //borderWidth: 1,
//                         width: "10%",
//                         alignItems: "center",
//                         justifyContent: "center"
//                     }}>
//                     {
//                         !value ?
//                             <Calendar width={20} height={20} />
//                             :
//                             !props.hideReset &&
//                             <TouchableOpacity onPress={() => {
//                                 props.formik.setFieldValue(props.name, undefined);
//                                 setValue(undefined);
//                                 props.onReset && props.onReset();
//                             }}>
//                                 <Exit width={20} height={20} />
//                             </TouchableOpacity>


//                         //<Image source={eventBlack} style={{ width: 20, height: 20 }} resizeMode="contain" />
//                     }
//                 </TouchableOpacity>
//             </View>
//             <HelperText visible={meta.touched && Boolean(meta.error)} type={meta.error ? "error" : "info"}>
//                 {meta.touched && meta.error}
//             </HelperText>
//             <DateTimePickerModal
//                 maximumDate={props.maximumDate}
//                 minimumDate={props.minimumDate}
//                 mode={props.mode}
//                 date={value}
//                 onConfirm={(date) => { setValue(date); props.formik.setFieldValue(props.name, date); setShowModal(false); props.onConfirm && props.onConfirm(date) }}
//                 onCancel={() => { setShowModal(false); props.onCancel && props.onCancel() }}
//                 isVisible={showModal} />
//         </>
//     )
// }










import { FieldMetaProps, FormikErrors } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { DefaultTheme, HelperText, PaperProvider, Text } from 'react-native-paper';
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
    locate?: string;
    confirmText?: string;
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
        getFieldMeta: (name: string) => FieldMetaProps<any>;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>;
    }
}
function ValidationDatePicker(props: ValidationDatePickerProps) {
    const [opened, setOpened] = useState(false);
    const [touched, setTouched] = useState(false);
    const meta = props.formik.getFieldMeta(props.name);

    useEffect(() => {
        if (meta.touched) {
            setTouched(true);
        }
    }, [meta.touched]);

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
        if (touched && Boolean(meta.error)) {
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


            <TouchableOpacity
                style={{ borderBottomWidth: 1.5, borderColor: touched && Boolean(meta.error) ? DefaultTheme.colors.error : "gray", padding: 8, borderRadius: 8, width: "100%", flexDirection: "row" }}
                onPress={() => setOpened(true)}>
                <View style={{ width: "90%" }}>
                    <Text style={{ fontSize: 16, color: getLabelColor() }}>{meta.value ? moment(meta.value).format(props.format || "MM/DD/YYYY") : props.placeholder || "Pick a date"}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "flex-end" }}>
                    {
                        props.reset ?
                            meta.value ?
                                <TouchableOpacity onPress={(e) => { props.formik.setFieldValue(props.name, undefined) }}>
                                    <Cancel />
                                </TouchableOpacity>
                                :
                                <Calendar />
                            :
                            <Calendar />
                    }
                </View>
            </TouchableOpacity>
            <HelperText visible={touched && Boolean(meta.error)} type={meta.error ? "error" : "info"}>
                {touched && meta.error}
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

function Cancel(props: SvgProps) {
    return (
        <Svg
            width={24}
            height={24}
            fill={"red"}
            viewBox="0 0 512 512"
            {...props}
        >
            <Path
                fill="#000"
                transform="translate(91.52 91.52)"
                stroke="none"
                strokeWidth={1}
                fillRule="evenodd"
                d="M328.96 30.2933333L298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48z"
            />
        </Svg>
    );
}


export default ValidationDatePicker