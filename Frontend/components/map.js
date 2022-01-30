import React, { useEffect } from 'react';

import {
    StyleSheet,
    Modal,
    Text,
    View,
    TextInput,
    Button,
    Dimensions,
    TextComponent,
    TextInputComponent,
    Pressable,
    Platform, Linking
} from 'react-native';
import styles from "../StyleSheets/mapStyles"
import MapView, {Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {useState} from 'react'
import {MapStyles} from "../StyleSheets/storeStyle"
import axios from "axios";
import openMap from 'react-native-open-maps';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height


const map = () => {

    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)
    const [located, setLocated] = useState(false)
    const [wasteFacilites, setWasteFacilities] = useState([])
    const [wasteCoordinates, setWasteCoordinates] = useState([])
    const [show, setShow] = useState(false);
    const [radius, setRadius] = useState(9.32);
    const [text, setText] = React.useState("9.32");

    class Facility {
        constructor(_facilityName, _facilityAddress, _facilityLatitude, _facilityLongitude) {
            this.facilityName = _facilityName;
            this.facilityAddress = _facilityAddress;
            this.facilityLatitude = _facilityLatitude;
            this.facilityLongitude = _facilityLongitude;
        }
    }


    useEffect(() => {
        getLocation().then();
        getStores().then();
    },[radius])

    async function getStores(){
        console.log("radius: "+ radius);
        let apiWasteCall = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+latitude+'%2C'+longitude+'&radius='+(radius*1609)+'&type=supermarket&key=AIzaSyC416nnF7CfQ1BhXDkiZu1cUtag2gVOEHE';
        let tempArr = [];
            let tempCoord = [];
            axios.get(apiWasteCall).then((facilities) => {
                for(var i = 0; i < facilities.data.results.length; i++) {
                        var temp = new Facility(facilities.data.results[i].name, facilities.data.results[i].vicinity, facilities.data.results[i].geometry.location.lat, facilities.data.results[i].geometry.location.lng);
                        tempArr.push(temp);
                }
                setWasteFacilities(tempArr);
                tempArr.forEach((facility) => {

                    var facility_ = {
                        name : facility.facilityName,
                        address : facility.facilityAddress,
                        lat: facility.facilityLatitude,
                        long: facility.facilityLongitude
                    }
                    tempCoord.push(facility_)
                })
                setWasteCoordinates(tempCoord)
            })
    }
    async function getLocation() {
        let{status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            console.error("Error getting permissions")
            return;
        }
        let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest})
        let latitude_ = location.coords.latitude
        let longitude_ = location.coords.longitude
        let altitude = location.coords.altitude

        setLatitude(latitude_)
        setLongitude(longitude_)
        setLocated(true)
        console.log("Latitude: " + latitude + " Longitude: " + longitude + " Altitude: " + altitude)
    }

    return (
        <View style={styles.container}>
            <View style = {{marginTop: 0, height: height / 4, backgroundColor: "white", zIndex: 3, width: "100%", justifyContent: "center", alignItems:"center"}}>
                <View>
                <Text style = {{marginTop: height / 6,fontWeight: 'bold', fontSize: 16, color: 'black'}}> Explore the map to find supermarkets near you!</Text>
                </View>
            </View>

            <View style = {{position: "absolute", bottom: height / 30, left: width / 20, justifyContent:"center"}} >
                <Pressable style = {{
                    backgroundColor: 'lightblue', width:40 , height: 40, alignSelf:"center",
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "black",

                }} onPress ={() => {setShow(true)}} >
                    <Text style = {{color: 'black', fontSize: 25, alignSelf: 'center'}}>?</Text>
                </Pressable>
            </View>

            <Modal transparent = {true} visible = {show}>
                <View style = {{ backgroundColor : "#000000aa", flex: 1}}>
                    <View style = {{backgroundColor : "#ffffff", margin: 0, padding: 40, borderRadius: 10}}>
                        <Text style = {{fontSize: 20}}>Enter Search Radius(miles): </Text>
                        <TextInput
                            style = {{borderWidth: 1, borderColor: "black", fontSize: 15, paddingLeft: 5}}
                            label="miles"
                            value={text}
                            onChangeText={text => setText(text)}
                        />
                        <View style = {{paddingTop: 10, paddingBottom: 10}}>
                        <Pressable style = {{margin: 0, backgroundColor: 'orange', padding: 10, borderRadius: 10, alignItems: 'center'}} onPress ={() => {setRadius(text); setShow(false)}} >
                            <Text style = {{ color: 'black', fontSize: 20}}>submit</Text>
                        </Pressable>
                        </View>
                        <Pressable style = {{margin: 0, backgroundColor: 'lightblue', padding: 10, borderRadius: 10, alignItems: 'center'}} onPress ={() => {setShow(false)}} >
                            <Text style = {{ color: 'black', fontSize: 20}}>close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {located ?
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    onPoiClick={(data) => {
                        console.log(data)
                    }}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: radius/69,
                        longitudeDelta: radius/69
                    }}>
                    <Marker
                        coordinate={{latitude: latitude, longitude: longitude}}
                        pinColor='red'
                        title='You are here'
                    />
                    {wasteCoordinates.map(facility => (
                        <MapView.Marker
                            coordinate={{latitude: facility.lat, longitude: facility.long}}
                            pinColor='green'
                            title={facility.name}
                        >

                            <Callout style={MapStyles.plainView}>
                                <View>
                                    <Text adjustsFontSizeToFit>{facility.name}</Text>
                                    <Text adjustsFontSizeToFit>{facility.address}</Text>
                                </View>
                            </Callout>
                        </MapView.Marker>
                    ))}
                </MapView> :
                <MapView style={styles.map}/>}
        </View>

    );
}

export default map;
