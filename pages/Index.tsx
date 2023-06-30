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
import languages from '../utils/language';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

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
    const locateId = "en";

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
                    Toast.show(languages[locateId].index.sampleToastNotification, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: false,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }} >{languages[locateId].index.sampleToastButton}</Button>
            <HorizontalSpace />
            <Button
                mode='contained'
                onPress={() => {
                    navigate('About');
                }} >About</Button>

            <View style={{ width: "100%", rowGap: 10 }}>
                <ThemeTextInput
                    formik={formik}
                    name='email'
                    placeholder="Email"
                />
                <ThemeTextInput
                    formik={formik}
                    name='password'
                    placeholder="Password"
                    secureTextEntry
                />
                <Button mode='contained' onPress={() => formik.handleSubmit()}>Submit</Button>
            </View>

        </View>
    )
}
