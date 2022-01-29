import React from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';


let customFonts = {
    'Roboto': require('../assets/fonts/Roboto-Medium.ttf'),
    'Poppins' : require('../assets/fonts/Poppins-Medium.ttf')
  };
class home extends React.Component{
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
    
    render()
    {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          }
        return(
            <View >
                <Text style = {homeStyles.titleText}>Shopping List</Text>
                <View style = {homeStyles.container}>
                    <Text style = {{textAlign:"center"}}>Home</Text>
                </View>
            </View>
        )
    }
}
export default home;


// StyleSheet for Home Page
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const homeStyles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f5f5",
        zIndex: -1,
    },
    titleText: {
        backgroundColor: "#313639",
        position: "absolute",
        marginTop: height / 12,
        marginLeft: 30,
        fontSize : 40,
        fontFamily: "Poppins",
        fontWeight: '700',
        borderWidth : 3,
        borderRadius : 30,
        paddingLeft: 10,
        paddingRight: 10,
        color: "#f5f5f5",
        borderColor: "#313639",
        overflow:'hidden'
    }
});