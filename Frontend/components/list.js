import React from 'react'
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import shadeColor from './shadeColor'
let customFonts = {
    'Roboto': require('../assets/fonts/Roboto-Medium.ttf'),
    'Poppins' : require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold' : require('../assets/fonts/Poppins-Bold.ttf')
  };
class List extends React.Component {
    color = this.props.color
    state = {
        fontsLoaded: false,
      };
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
      
    render(){
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          }
    return(
        <View>
            <View style = {{
                borderColor: this.props.color, 
                backgroundColor: this.props.color, 
                borderRadius: 30,
                borderWidth: 1,
                padding: 5,
                paddingLeft: 8,
                paddingRight: 8,
                }}>
                <Text style = {styles.text}>{this.props.date}</Text>
            </View>
            

        </View>
    );
}
}

const styles = StyleSheet.create({
    container : {
        borderRadius: 30,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
    },
    text : {
        fontSize: 18,
        color: "white",
        fontFamily: 'Poppins-Bold',
        fontWeight: '900'
    }
})

export default List;