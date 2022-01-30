import { StyleSheet, Dimensions} from 'react-native'
const windowWidth = Dimensions.get('screen').width


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C13214',
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
    }

});

export default styles;