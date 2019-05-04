import constants from '../config/constants';
import firebase from './../config/firebase'

export default {
    // getProfile: (uid) => fetch(constants.API_URL + '/user/' + uid, {
    //     method: 'GET'
    // }),

    getToken: () => {
        return firebase.auth().currentUser.getIdToken(true)
    },

    test: () => {
        return "KUY"
    }
}