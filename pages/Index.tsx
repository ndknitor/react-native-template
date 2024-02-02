import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { Button, Text } from 'react-native-paper';
import useGlobalCount from '../context/hooks/useGlobalCount';
import { API_BASE_URL } from '../env';
import { PageProps } from '../utils/nativeprops';

export default function Index(props: PageProps) {
  const { navigate }  = props.navigation;
  const count = useGlobalCount();
  //const [scan, setScan] = useState("");
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <Text>{API_BASE_URL}</Text>
      <Button mode='contained' onPress={count.increase}>{count.value}</Button>
      <Button mode='contained' onPress={() => navigate("About")}>About</Button>
      {/* <AssetSvg.Ruby width={100} height={100} /> */}
      {/* <TextInput
        showSoftInputOnFocus={false}
        blurOnSubmit={false}
        autoFocus
        onChangeText={setScan}
        value={scan}
        onSubmitEditing={(e) => {
          console.log(scan);
          setScan("");
        }} /> */}
    </View>
  )
}
