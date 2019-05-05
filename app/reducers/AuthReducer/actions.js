import firebaseService from '../../config/firebase';
import * as types from './actionTypes';
import userService from '../../services/user'

export const loginByEmail = (email, password) => dispatch => {
    dispatch(sessionLoading());
    firebaseService
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            const uid = user.user.uid
            userService.getProfile(uid).then((res) => {
                dispatch(sessionSuccess(res.result));
            }).catch(err => dispatch(sessionError(err)));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const autoLogin = (uid) => dispatch => {
    dispatch(sessionLoading());
    userService.getProfile(uid).then((res) => {
        dispatch(sessionSuccess(res.result));
    }).catch(err => dispatch(sessionError(err)));
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