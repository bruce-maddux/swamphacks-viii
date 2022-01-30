import { StyleSheet, Dimensions} from 'react-native'
const windowWidth = Dimensions.get('screen').width
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import * as Font from 'expo-font';


const ReceiptStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputForm: {
        backgroundColor: '#fff',
        fontSize: 20,
        width: windowWidth / 1.5,
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },


    loginButton: {
        backgroundColor: '#fff'
    },


    map: {
        zIndex: -1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    button: {
        backgroundColor: '#5dd',
        borderRadius: 8
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

    left: {
        marginLeft: width / 11,
        backgroundColor: "#f5f5f5",
        overflow: 'hidden'
    },

});

export default ReceiptStyles;