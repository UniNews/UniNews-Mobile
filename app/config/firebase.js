import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD809aZn1CwnJPNwvTh-p4SHSNysesnS0U",
    authDomain: "uninews-api.firebaseapp.com",
    databaseURL: "https://uninews-api.firebaseio.com",
    projectId: "uninews-api",
    storageBucket: "uninews-api.appspot.com",
    messagingSenderId: "879298084174"
};
firebase.initializeApp(config);

export default firebase;

