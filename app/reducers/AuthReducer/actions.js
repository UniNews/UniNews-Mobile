import firebaseService from '../../config/firebase';
import * as types from './actionTypes';
import service from '../../services/user';

export const loginByEmail = (email, password) => dispatch => {
    dispatch(sessionLoading());
    firebaseService
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            getProfile(user.uid)
            dispatch(sessionSuccess(user));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const signupByEmail = (email, password, displayName) => dispatch => {
    dispatch(sessionLoading());
    // call UniNews-API from user service.
    firebaseService
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => dispatch(signupSuccess(user)))
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

const getProfile = (uid) => {
    return service.getProfile(uid).then(response => response.json())
        .then(response => {
            // map field to user object. Ex,
            user.displayName = response.displayName
            // etc.
        })
        .catch(err => dispatch(sessionError(err)));
};

const sessionLoading = () => ({
    type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
    type: types.SESSION_SUCCESS,
    user
});

const signupSuccess = user => ({
    type: types.SIGNUP_SUCCESS,
    user
});

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
});

const sessionClear = () => ({
    type: types.SET_INITIAL_STATE
});