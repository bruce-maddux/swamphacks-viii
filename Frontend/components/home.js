import React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView , TouchableOpacity, Pressable} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import List from './list'
import { Feather } from '@expo/vector-icons';

let customFonts = {
    'Roboto': require('../assets/fonts/Roboto-Medium.ttf'),
    'Poppins' : require('../assets/fonts/Poppins-Medium.ttf')
  };

class home extends React.Component{
    state = {
        fontsLoaded: false,
        selectedList: 1,
      };
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
     handleSelectedList=(num)=>{
        console.log(num)
        this.setState({selectedList : num});
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
                <View style = {{display:"flex", flexDirection:"row"}}>
                  <Text style = {homeStyles.subTitleText}>My Lists</Text>
                  <Feather name= "plus-circle" color= "black" size={35} style = {{paddingRight: 20}}/>
                </View>
                <ScrollView horizontal = {true} showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                  <Pressable style = {{paddingRight: 10,}} onPress = {() => this.handleSelectedList(1)}>
                    <List date = "1/30/2022" color = {this.state.selectedList === 1 ? "#36454F" :"#7393B3"}></List>
                  </Pressable>
                  <Pressable style = {homeStyles.myList} onPress = {() => this.handleSelectedList(2)}>
                    <List  date = "1/29/2022" color = {this.state.selectedList === 2 ? "#36454F" :"#7393B3"}></List>
                  </Pressable>
                  <Pressable style = {homeStyles.myList} onPress = {() => this.handleSelectedList(3)}>
                    <List  date = "1/29/2022" color = {this.state.selectedList === 3 ? "#36454F" :"#7393B3"}></List>
                  </Pressable>
                  <Pressable style = {homeStyles.myList} onPress = {() => this.handleSelectedList(4)}>
                    <List  date = "1/29/2022" color = {this.state.selectedList === 4 ? "#36454F" :"#7393B3"}></List>
                  </Pressable>
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
        overflow:'hidden',
        paddingBottom: 20,
    },
    subTitleText:{
      fontSize: 30,
      paddingBottom: 10,
      flex : 1,
    },
    listContainer : {
      display: "flex",
      flexDirection: "row",
    },
    myList : {
      paddingRight: 10,
    }
});