import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Edith(props) {
  const {navigation}=props;

  const goToKitchen=()=>{
    navigation.navigate("Kitchen");
  }
  return (
    <View>
      <Text>aaaaaa</Text>
      <Text>aaaaaa</Text>
      <Text>aaaaaa</Text>
      <Text>aaaaaa</Text>
      <Text>aaaaaa</Text>
      <Button onPress={goToKitchen} title='ir'/>
    </View>
  )
}