import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import useRouter from '../libs/hook/useRouter';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import InfiniteScrollView, { InfiniteScrollViewRef } from '../components/InfiniteScrollView/InfiniteScrollView';
import appxios from '../components/AxiosInterceptor';
import useLocalStorage from '../libs/hook/useLocalStorage';
interface Item {
    id: number;
    name: string;
}
export default function Index() {
    const { navigate } = useRouter();
    const [search, setSearch] = useState("");
    const [value, setValue] = useLocalStorage("value", "dit me may");
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <Button mode='contained' onPress={() => navigate("About")}>About</Button>
            {/* <AssetSvg.Ruby width={100} height={100} /> */}
            {/* <Text variant='titleLarge'>Anh có tất cả, nhưng lại thiếu em</Text>*/}
        </View>
    )
}
