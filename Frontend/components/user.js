import React, {useState} from 'react'
import {Text, View, Image, TextInput, Pressable, KeyboardAvoidingView, Modal} from 'react-native';
import styles from "../StyleSheets/AppStyling"
import userStyles from '../StyleSheets/userStyles'
import loginStyles from '../StyleSheets/loginStyles'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let picture = require("../assets/blank_user.png");
let customFonts = {
    'Roboto': require('../assets/fonts/Roboto-Medium.ttf'),
    'Poppins' : require('../assets/fonts/Poppins-Medium.ttf')
  };
class user extends React.Component{
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }

      componentDidMount() {
        this._loadFontsAsync();
      }
    state = {
        name : "My Name",
        email : "username",
        password : "password",
        phoneNumber : "",
        isEditing: false,
        show: false
    }
    handleEmail=(text)=>{
        this.setState({email:text});
    }
    handlePassword=(text)=>{
        this.setState({password:text});
    }
    handlePhoneNumber=(text)=>{
        this.setState({phoneNumber:text});
    }
    handleName = (text) => {
        this.setState({name:text});
    }
    render()
    {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          }
        const {width, height} = Image.resolveAssetSource(picture);
        return(
            <KeyboardAvoidingView style = {userStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style = {{fontSize: 40, fontFamily: "Poppins", position: 'absolute', top: height / 22}}>User Info</Text>
                <View style = {{borderRadius: 100, height: 200, width: 200, overflow:"hidden", alignItems:"center", justifyContent:"center"}}>
                    <Image style={styles.image} source={picture}/>
                </View>
                <View style = {{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                  {this.state.isEditing ? 
                  <TextInput autoFocus style = {{textAlign:"center",  fontSize: 25, fontFamily: "Poppins", paddingRight: 10}}
                  onChangeText = {(text) => this.handleName(text)}
                  onBlur={() => this.setState({ isEditing: false })}
                  >
                    {this.state.name}
                  </TextInput> :
                  <Text style = {{textAlign:"center",  fontSize: 25, fontFamily: "Poppins", paddingRight: 10}}>
                    {this.state.name}
                  </Text>}
                  <Pressable onPress = {() => this.setState({isEditing: true})}>
                    {this.state.isEditing ? <FontAwesome name = "pencil" color = "black" size = {35}/> :                   
                      <FontAwesome name = "pencil" color = "#a9a9a9" size = {35}/>
                    }
                  </Pressable>
                </View>



                <View style = {{flexDirection : 'row', alignItems : "center"}}>
                    <SimpleLineIcons style = {{marginRight : 10,}}name={"user"} color={"black"} size={25} />
                    <View style={loginStyles.viewInput}>
                        <TextInput
                            style={loginStyles.textInput}
                            placeholderTextColor="black"
                            keyboardType="visible-password"
                            textAlignVertical='top'
                            onChangeText={(text) =>this.handlePassword(text)}
                        >{this.state.email}</TextInput>
                    </View>
                </View>
                <View style = {{flexDirection : 'row', alignItems : "center"}}>
                    <SimpleLineIcons style = {{marginRight : 10,}}name={"lock"} color={"black"} size={25} />
                    <View style={loginStyles.viewInput}>
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder = "password"
                            placeholderTextColor="black"
                            keyboardType="visible-password"
                            secureTextEntry={true}
                            textAlignVertical='top'
                            onChangeText={(text) =>this.handlePassword(text)}
                        >
                            {this.state.password}
                        </TextInput>
                    </View>
                </View>
                <View style = {{flexDirection : 'row', alignItems : "center"}}>
                    <SimpleLineIcons style = {{marginRight : 10,}}name={"phone"} color={"black"} size={25} />
                    <View style={loginStyles.viewInput}>
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder = "Enter a phone number"
                            placeholderTextColor="gray"
                            keyboardType="visible-password"
                            textAlignVertical='top'
                            onChangeText={(text) =>this.handlePhoneNumber(text)}
                        >
                            {this.state.phoneNumber.length != 0 ? this.state.phoneNumber : ""}
                        </TextInput>
                    </View>
                </View>
                <View style = {{position: "absolute", bottom: height / 30, justifyContent:"center"}} >
                    <Pressable style = {{
                        backgroundColor: 'lightblue', width:200 , height: 40, alignSelf:"center",
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "black",

                    }} onPress ={() => {this.setState({show: true})}}>
                        <Text style = {{color: 'black', fontSize: 23, alignSelf: 'center'}}>About the App!</Text>
                    </Pressable>
                </View>
                <Modal transparent = {true} visible = {this.state.show}>
                    <View style = {{ backgroundColor : "#000000aa", flex: 1, paddingTop: 40, paddingBottom: 40}}>
                        <View style = {{backgroundColor : "#ffffff", margin: 0, flex:1, borderRadius: 10}}>
                            <View style = {{paddingTop:10, alignItems: 'center'}}>
                                <Text style = {{fontSize: 30, fontWeight: 'bold', textDecorationLine: "underline"}}>About the App</Text>
                            </View>
                            <View style = {{paddingTop:15, paddingLeft:15, paddingRight:15, paddingBottom:10, alignItems: 'center'}}>
                                <Text style = {{fontSize: 15}}>"CartIt" is a revolutionary mobile application that allows one to compile their personal grocery list and receive information on the best store to buy the items based on the lowest price. The application does this through the use of an established public database in combination with user submitted receipts that are analyzed using machine learning algorithms.</Text>
                            </View>
                            <View style = {{paddingTop:5, alignItems: 'center'}}>
                                <Text style = {{fontSize: 20, fontWeight: 'bold', textDecorationLine: "underline"}}>The Developers</Text>
                            </View>
                            <View style = {{alignItems:"center"}}>
                                <View style = {{flexDirection:"row", alignItems:"center"}}>
                                    <View style = {{alignItems:"center", padding: 7, paddingRight: 30}}>
                                        <Image style = {{height: 120, width: 120}}source={require("../assets/edwin.png")}/>
                                        <Text>Edwin Lora</Text>
                                        <Text>Lead Backend</Text>
                                    </View>
                                    <View style = {{alignItems:"center", padding : 7}}>
                                        <Image style = {{height: 120, width: 120}}source={require("../assets/bruce.png")}/>
                                        <Text>Bruce Maddux</Text>
                                        <Text>Lead Frontend</Text>
                                    </View>
                                </View>
                                <View style = {{flexDirection:"row", alignItems:"center"}}>
                                    <View style = {{alignItems:"center", padding: 7, paddingRight: 30}}>
                                        <Image style = {{height: 120, width: 120}}source={require("../assets/Samir.png")}/>
                                        <Text>Samir Ziad</Text>
                                        <Text>Fullstack</Text>
                                    </View>
                                    <View style = {{alignItems:"center", padding : 7}}>
                                        <Image style = {{height: 120, width: 120}}source={require("../assets/connor.png")}/>
                                        <Text>Connor Syron</Text>
                                        <Text>Backend</Text>
                                    </View>
                                </View>
                            </View>
                            <View style = {{position:"absolute", bottom:0, alignItems:"center", width: "100%"}}>
                                <Pressable style = {{backgroundColor: 'lightblue', padding: 10, borderRadius: 10, alignItems: 'center'}} onPress ={() => {this.setState({show: false})}} >
                                    <Text style = {{ color: 'black', fontSize: 20}}>close</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        )
    }
}
export default user;