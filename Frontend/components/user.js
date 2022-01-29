import React from 'react'
import { Text, View } from 'react-native';
import userStyles from '../StyleSheets/userStyles'
class user extends React.Component{
    render()
    {
        return(
            <View style = {userStyles.container}>
                <Text style = {{textAlign:"center"}}>User</Text>
            </View>
        )
    }
}
export default user;