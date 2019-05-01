import * as types from './actionTypes';
import service from '../../services/news';

const fetch_article = () => {
    return { type: types.FETCH_ARTICLE };
}

const articleOk = (payload) => {
    return { type: types.ARTICLE_OK, payload };
}

const articleFail = () => {
    return { type: types.ARTICLE_FAIL };
}

export function getArticle(id) {
    return (dispatch) => {
        dispatch(fetch_article());
        service.getArticle(id)
            .then((res) => {
                const articles = res;
                console.log(articles)
                dispatch(articleOk(articles.result));
            }).catch(err => dispatch(articleFail()));
    };
}
