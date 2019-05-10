import * as types from './actionTypes';
import userService from '../../services/user'
// import newsService from '../../services/news';

/* PROFILE */
const fetch_profile = () => {
    return { type: types.FETCH_PROFILE };
}

const profileOk = (payload) => {
    return { type: types.PROFILE_OK, payload };
}

const profileFail = () => {
    return { type: types.PROFILE_FAIL };
}

// /* FAVORITE */
// const request_favorite = () => {
//     return { type: types.REQUEST_FAVORITE };
// }

// const favoriteOk = () => {
//     return { type: types.FAVORITE_OK };
// }

// const favoriteFail = () => {
//     return { type: types.FAVORITE_FAIL };
// }

/* PROFILE ACTIONS */
export function getProfile(uid) {
    return (dispatch) => {
        dispatch(fetch_profile());
        userService.getProfile(uid).then((res) => {
            dispatch(profileOk(res.result));
        }).catch(err => dispatch(profileFail(err)));
    };
}

export function updateProfile(uid, displayName, aboutMe, imgURL) {
    return (dispatch) => {
        dispatch(fetch_profile());
        userService.getToken().then(function (idToken) {
            console.log(idToken)
            userService.updateProfile(idToken, displayName, aboutMe, imgURL).then((res) => {
                userService.getProfile(uid).then((res) => {
                    dispatch(profileOk(res.result));
                }).catch(err => dispatch(profileFail(err)));
            }).catch(err => dispatch(profileFail(err)));
        }).catch(function (error) {
            dispatch(profileFail(error))
        });
    }
}

export function followingUser(uid) {
    return (dispatch) => {
        dispatch(fetch_profile());
        userService.getToken().then(function (idToken) {
            console.log(idToken)
            userService.followingUser(idToken, uid).then((res) => {
                console.log("**********")
                console.log(res)
                console.log("**********")
                userService.getProfile(userService.getUid()).then((res) => {
                    dispatch(profileOk(res.result));
                }).catch(err => dispatch(profileFail(err)));
            }).catch(err => dispatch(profileFail(err)));
        }).catch(function (error) {
            dispatch(profileFail(error))
        });
    }
}