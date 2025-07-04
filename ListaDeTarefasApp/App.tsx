import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AddTask from "./screens/AddTask";
import React from "react";

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'ＴＡＲＥＦＡＳ',
            headerStyle: { backgroundColor: 'pink' },
            headerTintColor: '#333'
          }}
        />
        <Stack.Screen
          name="Details" 
          component={DetailsScreen}
          options={{
            title: 'Detalhes',
            headerStyle: { backgroundColor: '#dc3545' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="AddTask" 
          component={AddTask}
          options={{
            title: 'ＮＯＶＡ ＴＡＲＥＦＡ',
            headerStyle: { backgroundColor: 'pink' },
            headerTintColor: '#333'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
