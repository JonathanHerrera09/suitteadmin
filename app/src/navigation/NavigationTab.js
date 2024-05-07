import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome  } from '@fortawesome/free-solid-svg-icons/faHome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons/faUtensils';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import ShowOrders from "../components/ShowOrders";
import Edith from "../components/Edith";
import Kitchen from '../components/Kitchen';
import CreateOrders from "../components/CreateOrders";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeS(Props){
    return(
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{headerShown: false}}>
                <Stack.Screen name="NavigationTab" component={NavigationTab} /> 
                <Stack.Screen name="Edith" component={Edith} />
                <Stack.Screen name="Kitchen" component={Kitchen} /> 
            </Stack.Navigator>
       </NavigationContainer>
    )
}
function NavigationTab(){
    return(
            <Tab.Navigator >
                <Tab.Screen name="Ordenes" component={ShowOrders} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faHome} color={color} size={size} />
                    )
                }}
                />
                <Tab.Screen name="Cocina" component={Kitchen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faUtensils} color={color} size={size} />
                    )
                }}
                />
                <Tab.Screen name="Agregar orden" component={CreateOrders} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faPlus} color={color} size={size} />
                    )
                }}
                />
                <Tab.Screen name="Entregar" component={Kitchen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faTruck} color={color} size={size} />
                    )
                }}
                />
                <Tab.Screen name="Configuración" component={Kitchen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faCog} color={color} size={size} />
                    )
                }}
                />
            </Tab.Navigator>
    )
}
export default HomeS