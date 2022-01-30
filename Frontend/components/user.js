import React from 'react'
import { Text, View, Image, TextInput , Pressable, KeyboardAvoidingView} from 'react-native';
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
    selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })

          const metadata = {
              contentType : 'image/jpg'
          }

          const stor = getStorage(firebase)
          const pathRef = ref(stor, 'newimage.jpg')
          const imageRef = ref(stor, uuid.v4())
          
          

          const response = await fetch(result.uri)
          const blob = await response.blob()

          
          
          await uploadBytes(imageRef, blob, metadata).then((res) => {
              console.log("UPLOADED")
          })

          console.log(stor)
          if(!result.cancelled){
              this.setState({
                  image : result.uri,
                  uploaded : true
              })
          }  
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
                <Text style = {{fontSize: 40, fontFamily: "Poppins", position: 'absolute', top: height / 15}}>User Info</Text>
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
                
                
            </KeyboardAvoidingView>
        )
    }
}
export default user;