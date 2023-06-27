import { Button, Text } from '@react-native-material/core'
import React from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast';
import useRouter from '../libs/hook/useRouter';
import { useFormik } from 'formik';
import colors from '../utils/colors';
import appxios, { InterceptorParams } from '../components/AxiosInterceptor';
import SignInRequest from '../objects/requests/SignInRequest';
import FullWidthTextInput from '../components/FullWidthTextInput/FullWidthTextInput';
import HorizontalSpace from '../components/HorizontalSpace/HorizontalSpace';
import ErrorText from '../components/ErrorText/ErrorText';

export default function Index() {
    const { navigate } = useRouter();

    const formik = useFormik({
        initialValues: SignInRequest.getDefault(),
        validationSchema: SignInRequest,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <Text>Hello</Text>
            <Button onPress={async () => {
                // await appxios.get("", {
                //     params: {
                //         loadingLock: true
                //     } as InterceptorParams
                // });
                Toast.show('Địt mẹ mày', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: false,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            }} title="Hello" />
            <Button onPress={() => {
                navigate('About');
            }} title="About" />

            <FullWidthTextInput
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                placeholder="Email"
            />
            <ErrorText>{formik.errors.email}</ErrorText>
            <FullWidthTextInput
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                placeholder="Password"
                secureTextEntry
            />
            <ErrorText>{formik.errors.password}</ErrorText>

            <HorizontalSpace />

            <Button title="Submit" onPress={() => formik.handleSubmit()} />
        </View>
    )
}
