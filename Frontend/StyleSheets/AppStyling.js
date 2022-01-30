import {StyleSheet} from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
    },
    bigText : {
        fontSize : 50,
        marginBottom : 40,
        color : "#fff",
        fontFamily : "Futura-Medium",
    },
    charText : {
        fontSize : 50,
        color : "#fff",
        fontFamily : "Futura-Medium",
    },

    image: {
        marginTop : -50,
        width : 200,
        height: 200,
        resizeMode: "contain"
    },

    inputView: {
        backgroundColor: "#f5f5f5",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },
    TextInputHome: {
        padding: 10,
        marginTop: 20,
        width : 250,
        textAlign : "center",
        fontSize : 18
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#f5f5f5",
    },
    leftPos: {
        position: 'absolute',
        bottom : 30,
        left : 30,
    },
    rightPos : {
        position : 'absolute',
        bottom: 30,
        right : 30,
    },
    textButton: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    button: {
        marginTop : 25,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
    },
    buttonClicked: {
        marginTop : 25,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default styles;