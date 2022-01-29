import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
class map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            coordinates: [],
        };
    }
    componentDidMount() {

    }

    render()
    {
        return(
            <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        region={{
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}
        showsUserLocation={true}
        >
       <Marker
           coordinate={{
               latitude: this.state.latitude,
               longitude: this.state.longitude,
           }}>
       </Marker>
        </MapView>
        );
    }
}
export default map;