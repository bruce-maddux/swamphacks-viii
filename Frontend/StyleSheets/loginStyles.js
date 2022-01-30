import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width

const loginStyles = StyleSheet.create({
    textInput : {
        backgroundColor: 'transparent',
        fontSize: 17,
        width: windowWidth / 1.25,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        backfaceVisibility: 'hidden',
        textAlignVertical: 'center',
        flex: 5,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#000',
        borderBottomWidth: 1.5
    },
    viewInput : {
        alignContent: 'center',
        borderBottomColor: 'gray',
        width: windowWidth / 1.4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    button: {
        marginTop : 25,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#333',
        borderWidth: 2,
        color: 'white',
        fontSize: 24,
        overflow: 'hidden',
        padding : 10,
        textAlign:'center',
        width : 120,
        alignItems : 'center',
        flexDirection : 'row',
    },
    textButton: {
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'black',
    },
})
export default loginStyles;
