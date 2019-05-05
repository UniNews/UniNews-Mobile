import constants from '../config/constants';
import firebase from './../config/firebase'
import axios from 'axios';

export default {

    getToken: () => {
        return firebase.auth().currentUser.getIdToken(true)
    },

    register: async (idToken, displayName) => {
        return await axios.post(`${constants.API_URL}/regis`, {
            user_token: idToken,
            displayName: displayName
        }).then(response => response.data)
            .catch(error => error)
    },

    getProfile: async (uid) => {
        return await axios.get(`${constants.API_URL}/user/${uid}`).then(response => response.data)
            .catch(error => error)
    },

}