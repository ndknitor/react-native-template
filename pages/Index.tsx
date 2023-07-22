import React, { useState } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast';
import useRouter from '../libs/hook/useRouter';
import { useFormik } from 'formik';
import appxios, { InterceptorParams } from '../components/AxiosInterceptor';
import SignInRequest from '../objects/requests/SignInRequest';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import InfiniteScrollView from '../components/InfiniteScrollView/InfiniteScrollView';
import { sleep } from '../libs/functions';
import HorizontalSpace from '../components/HorizontalSpace/HorizontalSpace';
import ThemeTextInput from '../components/ThemeTextInput/ThemeTextInput';
import FadeInView from '../components/FadeInView/FadeInView';
interface Item {
    id: number;
    name: string;
}
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
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center", padding: 10 }}>
            <FadeInView>
                <View style={{ backgroundColor: "red", width: 90, height: 90 }} />
            </FadeInView>
            {/* <AssetSvg.Ruby width={100} height={100} /> */}
            {/* <Text variant='titleLarge'>Anh có tất cả, nhưng lại thiếu em</Text>
            <Button
                mode='contained'
                onPress={async () => {
                    await appxios.get("", {
                        loadAction: {
                            loadingLock: true
                        }
                    });
                    Toast.show("Dit me may");
                }} >Click</Button>
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
                    label="Email"
                />
                <ThemeTextInput
                    formik={formik}
                    name='password'
                    label="Password"
                    secureTextEntry
                />
                <Button mode='contained' onPress={() => formik.handleSubmit()}>Submit</Button>
            </View> */}

        </View>
    )
}
