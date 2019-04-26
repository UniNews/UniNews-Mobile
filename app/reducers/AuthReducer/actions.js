import firebaseService from '../../config/firebase';
import * as types from './actionTypes';
import service from '../../services/user';

export const loginByEmail = (email, password) => dispatch => {
    dispatch(sessionLoading());
    firebaseService
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(sessionSuccess(user));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const signupByEmail = (email, password, displayName) => dispatch => {
    dispatch(sessionLoading());
    firebaseService
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(dispatch(signupSuccess(user)))
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
export const getProfile = (uid) => dispatch =>{
    dispatch(sessionLoading());
    return service.getProfile(uid).then(response => response.json())
        .then(response => dispatch(getProfileID(response)))
        .catch(err => dispatch(sessionClear()));
};
const getProfileID = response =>({
     type: types.GET_PROFILE, response
})
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