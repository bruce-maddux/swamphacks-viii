import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import reactDom from "react-dom";
import { Dimensions } from 'react-native';
import {StyleSheet} from "react-native"
import {useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const homeStyles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    titleText: {
        position: "absolute",
        marginTop: height / 12,
        marginLeft: 30,
        fontSize : 40,
        fontFamily: "Roboto_400Regular"

    }
});

export default homeStyles;


