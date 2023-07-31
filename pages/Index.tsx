import React from 'react'
import { View } from 'react-native'
import useRouter from '../libs/hook/useRouter';
import { Button } from 'react-native-paper';
interface Item {
    id: number;
    name: string;
}
export default function Index() {
    const { navigate } = useRouter();
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <Button mode='contained' onPress={() => navigate("About")}>About</Button>
            {/* <AssetSvg.Ruby width={100} height={100} /> */}
            {/* <Text variant='titleLarge'>Anh có tất cả, nhưng lại thiếu em</Text>*/}
        </View>
    )
}
