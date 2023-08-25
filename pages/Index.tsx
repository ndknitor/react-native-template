import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import useRouter from '../libs/hook/useRouter';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import InfiniteScrollView, { InfiniteScrollViewRef } from '../components/InfiniteScrollView/InfiniteScrollView';
import appxios from '../components/AxiosInterceptor';
interface Item {
    id: number;
    name: string;
}
export default function Index() {
    const { navigate } = useRouter();
    const fetchData = async (page: number) => {
        const response = await appxios.get<number[]>(`http://13.212.116.185:5000/main?Page=${page}`);
        return response.data;
    }
    const infiniteScrollViewRef = useRef<InfiniteScrollViewRef>(null);
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            {/* <Button mode='contained' onPress={() => navigate("About")}>About</Button> */}
            {/* <AssetSvg.Ruby width={100} height={100} /> */}
            {/* <Text variant='titleLarge'>Anh có tất cả, nhưng lại thiếu em</Text>*/}
            <Button onPress={() => {
                infiniteScrollViewRef.current?.fetch();
            }}>Search</Button>
            <InfiniteScrollView
                style={{ width: "100%" }}
                ref={infiniteScrollViewRef}
                fetch={fetchData}
                dataView={(item: number) =>
                    <Text>{item}</Text>
                }
                placeHolderView={
                    <>
                        <ActivityIndicator size={120} />
                    </>}
            />
        </View>
    )
}
