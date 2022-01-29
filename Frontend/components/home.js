import React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import List from './list'

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
            <View style = {homeStyles.container}>
              <View style = {homeStyles.left}>
                <Text style = {homeStyles.titleText}>Shopping List</Text>
                <Text style = {homeStyles.subTitleText}>My Lists</Text>
                <ScrollView horizontal = {true} showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}>
                  <View style = {homeStyles.myList}>
                    <List  date = "1/29/2022" color = "#055C9D"></List>
                  </View>
                  <View style = {homeStyles.myList}>
                    <List  date = "1/29/2022" color = "#006400"></List>
                  </View>
                  <View style = {homeStyles.myList}>
                    <List  date = "1/29/2022" color = "#9047de"></List>
                  </View>
                  <View style = {homeStyles.myList}>
                    <List  date = "1/29/2022" color = "#055C9D"></List>
                  </View>

                </ScrollView>
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
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f5f5",
        zIndex: -1,
    },
    left: {
      marginLeft: width / 11,
    },
    titleText: {
        marginTop: height / 12,
        fontSize : 40,
        fontFamily: "Poppins",
        fontWeight: '700',
        color: "black",
        overflow:'hidden'
    },
    subTitleText:{
      fontSize: 30,
      paddingTop: 20,
      paddingBottom: 10,
    },
    listContainer : {
      display: "flex",
      flexDirection: "row",
    },
    myList : {
      paddingRight: 10,
    }
});