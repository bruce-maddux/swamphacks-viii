import { StyleSheet, Dimensions} from 'react-native'
const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const MapStyles = StyleSheet.create({
    customView: {
        width: 140,
        height: 140,
    },
    plainView: {
        width: 100,
    },
    container: {
        flex: 1,
        backgroundColor: '#C13214',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: '#03CF00',
        fontWeight: 'bold'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    calloutButton: {
        width: 'auto',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
});