import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShowOrders from '../components/ShowOrders';
import Edith from '../components/Edith';
import Kitchen from '../components/Kitchen';
const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Ordenes" component={ShowOrders} /> 
        <Stack.Screen name="Edith" component={Edith} />
        <Stack.Screen name="Kitchen" component={Kitchen} /> 
    </Stack.Navigator>
  );
}