import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import loginStyles from "../StyleSheets/loginStyles"
class login extends React.Component{
    render()
    {
        return(
            <View style = {loginStyles.container}>
                <Text style = {{textAlign:"center"}}>Login</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Tab')}>
                    <Text style={{height : 30, marginTop : 10, color : 'blue', textAlign: "center"}}>Go to Users</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default login;