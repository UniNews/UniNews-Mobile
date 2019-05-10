import constants from '../config/constants';
import firebase from './../config/firebase'
import axios from 'axios';

export default {

    getToken: () => {
        return firebase.auth().currentUser.getIdToken(true)
    },

    getUid: () => {
        return firebase.auth().currentUser.uid
    },

    followingUser: async (idToken, uid) => {
        return await axios.post(`${constants.API_URL}/user/following`, {
            user_token: idToken,
            user_id: uid
        }).then(response => response.data)
            .catch(error => error)
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

    updateProfile: async (idToken, displayName, aboutMe, imgURL) => {
        return await axios.post(`${constants.API_URL}/user/profile`, {
            user_token: idToken,
            displayName: displayName,
            aboutMe: aboutMe,
            img: imgURL
        }).then(response => response.data)
            .catch(error => error)
    },

    loginByFacebook: async () => {
        const appId = constants.APP_ID;
        const permissions = ['public_profile', 'email'];

        const {
            type,
            token,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(
            appId,
            { permissions }
        );

        switch (type) {
            case 'success': {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
                return Promise.resolve(facebookProfileData);
            }
            case 'cancel': {
                return Promise.reject('Cancel by user');
            }
        }
    },

    loginByGoogle: async () => {

        const result = await Expo.Google.logInAsync({
            androidClientId: '319434606205-n3k9ijd91al3h7bcropp4e17rf8j1klk.apps.googleusercontent.com',
            iosClientId: '319434606205-c5ooi2joi9d4un5pi227aitkpls5ku10.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            // iosStandaloneAppClientId: `319434606205-c5ooi2joi9d4un5pi227aitkpls5ku10.apps.googleusercontent.com`,
            // androidStandaloneAppClientId: `319434606205-n3k9ijd91al3h7bcropp4e17rf8j1klk.apps.googleusercontent.com`,
        }
        );

        if (result.type === 'success') {
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            const facebookProfileData = await firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
            return Promise.resolve(facebookProfileData);
        }
        else {
            return Promise.reject('Cancel by user');
        }
    }



}