import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import login from "./components/login"
import tabNavigator from './components/tabNavigator';
import newUserPage from './components/newUserPage';
const Stack = createNativeStackNavigator();

class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
              <Stack.Navigator
              screenOptions = {{
                  headerShown : false
              }}>
                  <Stack.Screen name="Login" component={login} />
                  <Stack.Screen name = "Tab" component = {tabNavigator}/>
                  <Stack.Screen name = "NewUser" component = {newUserPage}/>
              </Stack.Navigator>
          </NavigationContainer>
    );
  }
}
export default App;