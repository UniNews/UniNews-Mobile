import { StyleSheet, } from 'react-native';
import Constants from '../../config/constants'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Kanit-Regular'
    },
    nameText: {
        fontFamily: 'Kanit-Regular',
        color: '#fff',
        fontSize: 50,
    },
    avatar: {
        width: 150, height: 150,
        paddingTop: 15, paddingHorizontal: 20, paddingBottom: 10, alignItems: 'center',

    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        paddingTop: 20,
        // flex: 1,
        // justifyContent: 'space-between',
    }
});