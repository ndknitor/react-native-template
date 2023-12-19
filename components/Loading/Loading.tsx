import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

function Loading() {
    return (
        <View style={{ width: "100%", height: "100%" ,alignItems : "center", justifyContent : "center"}}>
            <ActivityIndicator size={'large'} />
        </View>
    )
}

export default Loading