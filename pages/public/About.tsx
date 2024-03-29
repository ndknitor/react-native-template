import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useFormik } from 'formik'
import SignInRequest from '../../objects/requests/SignInRequest'
import { AssetImage } from '../../assets'
import fetcker from '../../utils/fetcker'
import { StackScreenProps } from '@react-navigation/stack'
import { ParamListBase } from '@react-navigation/native'
import ValidationTextInput from '../../components/ValidationTextInput/ValidationTextInput'
import ValidationDatePicker from '../../components/ValidationDatePicker/ValidationDatePicker'
interface Params {
  id?: number;
}
export default function About(props: StackScreenProps<ParamListBase>) {
  const params = props.route.params as Params;
  const schema = SignInRequest();
  const formik = useFormik({
    initialValues: schema.getDefault(),
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      // Toast.show('Địt mẹ mày', {
      //   duration: Toast.durations.LONG,
      //   position: Toast.positions.BOTTOM,
      //   shadow: false,
      //   animation: true,
      //   hideOnPress: true,
      //   delay: 0,
      // });
    },
  });
  useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={{ width: "100%", height: "100%" }}>
      <View style={{ rowGap: 10, padding: 15, width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
        {/* <View style={{ backgroundColor: "red", height: 90, width: 90 }} /> */}
        <AssetImage.Ruby width={90} height={90} />
        <Button
          mode='contained'
          onPress={async () => {
            await fetcker.get("");
          }} >Click</Button>
        <View style={{ width: "100%", rowGap: 10 }}>
          <ValidationTextInput
            formik={formik}
            name='email'
            label="Email" />
          <ValidationTextInput
            formik={formik}
            name='password'
            label="Password"
            secureTextEntry />
          <ValidationDatePicker
            formik={formik}
            name='date'
            reset
            placeholder="Date"
            mode='datetime'
            format='MM/DD/YYYY hh:mm:ss' />
          <Button mode='contained' onPress={() => formik.handleSubmit()}>Submit</Button>
        </View>
      </View>
    </Animated.View>
  )
}
