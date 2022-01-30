import React from 'react'
import { Text, View } from 'react-native';
import mapStyles from '../StyleSheets/mapStyles'
import Dropdown  from './DropDown';
class recieptUploader extends React.Component{
    render()
    {
        return(
            <View style = {mapStyles.container}>
                <Text>Reciept Uploader</Text>
            </View>
        )
    }
}
export default recieptUploader;