import * as types from './actionTypes';
import service from '../../services/news';
import user from '../../services/user'

const post_request = () => {
    return { type: types.POST_REQUEST };
}

const postOk = () => {
    return { type: types.POST_OK };
}

const postFail = () => {
    return { type: types.POST_FAIL };
}

export function postNews(catalog, description, imgURL, title, tags) {
    return (dispatch) => {
        dispatch(post_request());
        user.getToken().then(function (idToken) {
            service.postNews(idToken, catalog, description, imgURL, title, tags).then((res) => {
                dispatch(postOk());
            }).catch(err => dispatch(postFail()));
        }).catch(function (error) {
            dispatch(postFail())
        });
    };
}
