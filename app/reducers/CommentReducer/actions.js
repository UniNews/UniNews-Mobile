import * as types from './actionTypes';
import service from '../../services/news';
import user from '../../services/user'

const request_comment = () => {
    return { type: types.REQUEST_COMMENT };
}

const commentOk = () => {
    return { type: types.COMMENT_OK };
}

const commentFail = () => {
    return { type: types.COMMENT_FAIL };
}

export function postComment(id, msg) {
    return (dispatch) => {
        dispatch(request_comment());
        user.getToken().then(function (idToken) {
            service.postComment(idToken, id, msg).then((res) => {
                console.log("*************")
                console.log(res)
                dispatch(commentOk());
            }).catch(err => dispatch(favoriteFail()));
        }).catch(function (error) {
            dispatch(commentFail())
        });
    };
}
