import { Button, Text } from '@react-native-material/core'
import React from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast';
import useRouter from '../libs/hook/useRouter';

export default function Index() {
    const { navigate } = useRouter();
    return (
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Text>Hello</Text>
            <Button onPress={() => {
                Toast.show('Lỗi kết nối mạng, vui lòng thử lại sau', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            }} title="địt mẹ mày" />

            <Button onPress={() => {
                navigate('About');
            }} title="About" />
        </View>
    )
}
