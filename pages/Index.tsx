import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { Button, Text } from 'react-native-paper';
import useGlobalCount from '../context/hooks/useGlobalCount';
import { API_BASE_URL } from '../env';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ScanTextInput from '../components/ScanTextInput/ScanTextInput';
import Toast from 'react-native-root-toast';

export default function Index(props: StackScreenProps<ParamListBase>) {
  const { navigate } = props.navigation;
  const count = useGlobalCount();
  // const [scan, setScan] = useState("");

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <Text>{API_BASE_URL}</Text>
      <Button mode='contained' onPress={count.increase}>{count.value}</Button>
      <Button mode='contained' onPress={() => navigate("About")}>About</Button>
      {/* <AssetSvg.Ruby width={100} height={100} /> */}
      <ScanTextInput
        onScanSubmit={Toast.show}
      />
    </View>
  )
}
