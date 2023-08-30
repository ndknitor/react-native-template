import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import useRouter from '../libs/hook/useRouter';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { InfiniteScrollView } from 'react-native-kn-components';
interface Item {
    id: number;
    name: string;
}
export default function Index() {
    const { navigate } = useRouter();
    const [search, setSearch] = useState("");
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <Button mode='contained' onPress={() => navigate("About")}>About</Button>
            {/* <AssetSvg.Ruby width={100} height={100} /> */}
            {/* <Text variant='titleLarge'>Anh có tất cả, nhưng lại thiếu em</Text>*/}
        </View>
    )
}
