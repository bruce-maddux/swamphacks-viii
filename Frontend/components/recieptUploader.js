import React from 'react'
<<<<<<< HEAD
import { Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import {getStorage, uploadBytes, ref, uploadString} from "firebase/storage"
import {utils} from "firebase/app"
import * as ImagePicker from 'expo-image-picker'
import firebase from '../config/firebase';
import {getFirestore} from 'firebase/firestore/lite'
import uuid from "react-native-uuid"

class ReceiptTab extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            image: "",
            uploaded : false,
            storageFB : null
        }
    }

    componentDidMount(){
        console.log(firebase)
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
        return(
            <View>
                <TouchableOpacity style={{
                        backgroundColor: '#00694d',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                        width: 120,
                        height: 40,
                        marginTop : Dimensions.get('screen').height / 2,
                        marginLeft: (Dimensions.get('screen').width / 2),
                        position: 'absolute',
                        }} onPress={this.selectImage}>
                    <Text>
                        Upload
                    </Text>
                </TouchableOpacity>
                {this.state.uploaded ? <Image source={{uri: this.state.image}} style={{ width: 200, height: 200 }}/> : null}
            </View>
        )
    }
}
export default ReceiptTab;
