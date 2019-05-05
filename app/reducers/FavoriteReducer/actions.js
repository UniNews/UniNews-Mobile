import * as types from './actionTypes';
import service from '../../services/news';
import user from '../../services/user'

const request_favorite = () => {
    return { type: types.REQUEST_FAVORITE };
}

const favoriteOk = () => {
    return { type: types.FAVORITE_OK };
}

const favoriteFail = () => {
    return { type: types.FAVORITE_FAIL };
}

export function postFavorite(id) {
    return (dispatch) => {
        dispatch(request_favorite());
        user.getToken().then(function (idToken) {
            service.postFavorite(idToken, id).then((res) => {
                dispatch(favoriteOk());
            }).catch(err => dispatch(favoriteFail()));
        }).catch(function (error) {
            dispatch(favoriteFail())
        });
    };
}
