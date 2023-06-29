import React from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast';
import useRouter from '../libs/hook/useRouter';
import { useFormik } from 'formik';
import appxios, { InterceptorParams } from '../components/AxiosInterceptor';
import SignInRequest from '../objects/requests/SignInRequest';
import HorizontalSpace from '../components/HorizontalSpace/HorizontalSpace';
import ThemeTextInput from '../components/ThemeTextInput/ThemeTextInput';
import AssetSvg from '../assets/svgs';
import { Button, Text } from 'react-native-paper';

export default function Index() {
    const { navigate } = useRouter();
    const formik = useFormik({
        initialValues: SignInRequest.getDefault(),
        validationSchema: SignInRequest,
        onSubmit: (values) => {
            Toast.show('Địt mẹ mày', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: false,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        },
    });

    return (
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <AssetSvg.Ruby width={100} height={100} />
            <Text>Hello</Text>
            <Button
                mode='contained'
                onPress={async () => {
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
                }} >Sample toast</Button>
            <Button
                mode='contained'
                onPress={() => {
                    navigate('About');
                }} >About</Button>

            <ThemeTextInput
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                error={formik.errors.email != undefined}
                helperText={formik.errors.email}
                value={formik.values.email}
                placeholder="Email"
            />
            <ThemeTextInput
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                error={formik.errors.password != undefined}
                helperText={formik.errors.password}
                value={formik.values.password}
                placeholder="Password"
                secureTextEntry
            />

            <HorizontalSpace />

            <Button mode='contained' onPress={() => formik.handleSubmit()}>Submit</Button>
        </View>
    )
}
