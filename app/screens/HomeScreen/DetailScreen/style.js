import { StyleSheet } from 'react-native';
import Constants from '../../../config/constants';

export default StyleSheet.create({
    container: {

    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Kanit-Regular'
    },
    topCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 26,
        fontFamily: 'Kanit-Regular',
    },
    author: {
        fontSize: 20,
        fontFamily: 'Kanit-Regular',
        color: Constants.PRIMARY_COLOR,
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    iconText: {
        fontFamily: 'Kanit-Regular',
        color: 'grey'
    },
    description: {
        fontSize: 15,
        paddingTop: 17,
        fontFamily: 'Kanit-Regular',
    },
    commentHeader: {
        paddingLeft: 20,
        fontSize: 20,
        fontFamily: 'Kanit-Regular',
    },
    comment: {
        fontFamily: 'Kanit-Regular',
    },
    myCommentContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        paddingLeft: 16,
    },
    myCommentName: {
        fontSize: 16,
        color: Constants.PRIMARY_COLOR,
        fontFamily: 'Kanit-Regular',
    },
    commentButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    textInput: {
        borderBottomColor: 'grey', borderBottomWidth: 1, flex: 1
    },
    textInputEdited: {
        borderBottomColor: Constants.SECONDARY_COLOR, borderBottomWidth: 1, flex: 1
    }

});
