import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreens";



const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{title: 'Tela Principal',headerStyle:{
        backgroundColor:'pink'},headerTintColor:'#333'}}
        />
        <Stack.Screen
        name="Details" 
        component={DetailsScreen}
        options={{title: 'Detalhes',headerStyle:{
        backgroundColor:'pink'},headerTintColor:'#333'}}
        />

        <Stack.Screen
        name="AddTask" 
        component={DetailsScreen}
        options={{title: 'AddTask',headerStyle:{
        backgroundColor:'pink'},headerTintColor:'#333'}}
        />


       
      </Stack.Navigator>
    </NavigationContainer>
  )
}