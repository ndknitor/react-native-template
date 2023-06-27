import { Button, Text, TextInput } from '@react-native-material/core'
import React from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast';
import useRouter from '../libs/hook/useRouter';
import { useFormik } from 'formik';
import colors from '../utils/colors';
import appxios, { InterceptorParams } from '../components/AxiosInterceptor';
import SignInRequest from '../objects/requests/SignInRequest';

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
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Text>Hello</Text>
            <Button onPress={async () => {
                // await appxios.get("", {
                //     params: {
                //         loadingLock: true
                //     } as InterceptorParams
                // });
                Toast.show('Lỗi kết nối mạng, vui lòng thử lại sau', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: colors.error
                });
            }} title="Hello" />
            <Button onPress={() => {
                navigate('About');
            }} title="About" />
            <TextInput
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                placeholder="Email"
            />
            {formik.errors.email && <Text>{formik.errors.email}</Text>}

            <TextInput
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                placeholder="Password"
                secureTextEntry
            />
            {formik.errors.password && <Text>{formik.errors.password}</Text>}

            <Button title="Submit" onPress={() => formik.handleSubmit()} />

        </View>
    )
}
