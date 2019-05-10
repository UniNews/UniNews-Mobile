import firebaseService from '../../config/firebase';
import * as types from './actionTypes';
import userService from '../../services/user'
import Constants from '../../config/constants'

export const loginByEmail = (email, password) => dispatch => {
    dispatch(sessionLoading());
    firebaseService
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            const uid = user.user.uid
            dispatch(sessionSuccess(user));
            // userService.getProfile(uid).then((res) => {
            //     dispatch(sessionSuccess(res.result));
            // }).catch(err => dispatch(sessionError(err)));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const loginByFacebook = () => (dispatch) => {
    dispatch(sessionLoading());
    userService.loginByFacebook().then((user) => {
        userService.getToken().then(function (idToken) {
            let displayName = user.user.providerData[0].displayName
            userService.register(idToken, displayName).then((res) => {
                // dispatch(sessionSuccess(res.result))
                dispatch(sessionSuccess(user))
            }).catch(err => dispatch(sessionError(err)));
        }).catch(function (error) {
            dispatch(sessionError(error.message))
        });
    }).catch(err => dispatch(sessionError(err)));
}

export const loginByGoogle = () => (dispatch) => {
    dispatch(sessionLoading());
    userService.loginByGoogle().then((user) => {
        userService.getToken().then(function (idToken) {
            let displayName = user.user.providerData[0].displayName
            userService.register(idToken, displayName).then((res) => {
                // dispatch(sessionSuccess(res.result))
                dispatch(sessionSuccess(user))
            }).catch(err => dispatch(sessionError(err)));
        }).catch(function (error) {
            dispatch(sessionError(error.message))
        });
    }).catch(err => dispatch(sessionError(err)));
}

export const autoLogin = (user) => dispatch => {
    dispatch(sessionLoading());
    dispatch(sessionSuccess(user))
    // userService.getProfile(uid).then((res) => {
    //     dispatch(sessionSuccess(res.result));
    // }).catch(err => dispatch(sessionError(err)));
};

export const signupByEmail = (email, password, displayName) => dispatch => {
    dispatch(sessionLoading());
    // call UniNews-API from user service.
    firebaseService
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(usr => {
            userService.getToken().then(function (idToken) {
                userService.register(idToken, displayName).then((res) => {
                    dispatch(signupSuccess())
                }).catch(err => dispatch(sessionError(err)));
            }).catch(function (error) {
                dispatch(sessionError(error.message))
            });
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const logoutUser = () => dispatch => {
    dispatch(sessionLoading());
    firebaseService
        .auth()
        .signOut()
        .then(() => {
            dispatch(sessionClear());
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const clearState = () => dispatch => {
    dispatch(sessionClear());
};

const sessionLoading = () => ({
    type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
    type: types.SESSION_SUCCESS,
    user
});

const signupSuccess = () => ({
    type: types.SIGNUP_SUCCESS,
});

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
});

const sessionClear = () => ({
    type: types.SET_INITIAL_STATE
});