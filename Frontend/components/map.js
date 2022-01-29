
import React from 'react'
import { Text, View } from 'react-native';
import mapStyles from '../StyleSheets/mapStyles'
class map extends React.Component{
    render()
    {
        return(
            <View style = {mapStyles.container}>
                <Text style = {{textAlign:"center"}}>Map</Text>
            </View>
        )
    }
}
export default map;
