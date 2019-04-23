import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        width: 185,
        height: 150,
    },
    block: {
        alignSelf: 'center',
        width: 170,
        height: 135,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2
    },
    blockText: {
        color: 'grey',
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
        fontFamily: 'Kanit-Regular'
    },
    iconContainer: {
        alignSelf: "center",
        marginTop: 15
    }
});
