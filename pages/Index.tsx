import React from 'react'
import { View } from 'react-native'
import useRouter from '../utils/useRouter';
import { Button, Text } from 'react-native-paper';
import useGlobalCount from '../context/hooks/useGlobalCount';
import { API_BASE_URL } from '@env';

export default function Index() {
  const { navigate } = useRouter();
  const count = useGlobalCount();
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <Text>{API_BASE_URL}</Text>
      <Button mode='contained' onPress={count.increase}>{count.value}</Button>
      <Button mode='contained' onPress={() => navigate("About")}>About</Button>
      {/* <AssetSvg.Ruby width={100} height={100} /> */}
      {/* <Text variant='titleLarge'>Địt mẹ thằng Duy Nứng Dái</Text> */}
    </View>
  )
}
