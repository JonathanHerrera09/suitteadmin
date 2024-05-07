import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Kitchen(props) {
    const {navigation}=props;

  const goToKitchen=()=>{
    navigation.navigate("Edith");
  }
  return (
    <View>
      <Text>Kitchen</Text>
      <Text>Kitchen</Text>
      <Text>Kitchen</Text>
      <Text>Kitchen</Text>
      <Text>Kitchen</Text>
      <Text>Kitchen</Text>
      <Button onPress={goToKitchen} title='ir'/>
    </View>
  )
}