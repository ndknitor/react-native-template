import React, { useState } from 'react'
import { View } from 'react-native'
import useRouter from '../libs/hook/useRouter';
import { Button , Text} from 'react-native-paper';
export default function Index() {
    const { navigate } = useRouter();
    const [search, setSearch] = useState("");
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <Button mode='contained' onPress={() => navigate("About")}>About</Button>
            {/* <AssetSvg.Ruby width={100} height={100} /> */}
            <Text variant='titleLarge'>Địt mẹ thằng Duy Nứng Dái</Text>
        </View>
    )
}
