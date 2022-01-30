import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import {getStorage, uploadBytes, ref, uploadString} from "firebase/storage"
import {utils} from "firebase/app"
import * as ImagePicker from 'expo-image-picker'
import firebase from '../config/firebase';
import {getFirestore} from 'firebase/firestore/lite'
import uuid from "react-native-uuid"
import ReceiptStyles from '../StyleSheets/ReceiptStyles';

class ReceiptTab extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            image: "",
            uploaded : false,
            storageFB : null,
            selected : false
        }
    }

    componentDidMount(){
    }

    uploadImage = async () => {
        console.log("hello")

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

    uploadImageButton = () => {
        return(
            <TouchableOpacity style={{
                backgroundColor: '#00694d',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                width: 120,
                height: 40,
                }} onPress={this.uploadImage}>
                    <Text>
                        Upload Receipt
                    </Text>
            </TouchableOpacity>
        )
    }

    selectImageButton = () => {
        return(
            <TouchableOpacity style = {{ bottom: 10, alignSelf: "center"}} onPress = {this.selectImage} >
                <Text style = {{fontSize: 30, fontFamily: "Poppins", padding: 2, paddingLeft: 10, paddingRight: 10,
                borderWidth: 2, borderRadius: 25}}>Submit</Text>
              </TouchableOpacity>
            // <TouchableOpacity style={{
            //                 backgroundColor: '#00694d',
            //                 alignItems: 'center',
            //                 justifyContent: 'center',
            //                 borderRadius: 30,
            //                 width: 120,
            //                 height: 40,
            //                 }} onPress={this.selectImage}>
            //             <Text>
            //                 Select Image
            //             </Text>
            // </TouchableOpacity>

        )
    }
    
    render()
    {
        return(
            <View style={ReceiptStyles.container} >
                <Text style={ReceiptStyles.titleText}>Submit your receipt here!</Text>
                <View>
                    {this.state.uploaded ? <Image source={{uri: this.state.image}} style={{ width: 300, height: 300 }}/> : null}
                </View>
                {this.state.selected ? this.uploadImageButton() : this.selectImageButton()}
                    
              
            </View>
        )
    }
}
export default ReceiptTab;