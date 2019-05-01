import * as types from './actionTypes';
import service from '../../services/news';

const fetch_articles = () => {
    return { type: types.FETCH_ARTICLES };
}

const articlesOk = (payload) => {
    return { type: types.ARTICLES_OK, payload };
}

const articlesFail = () => {
    return { type: types.ARTICLES_FAIL };
}

export function getArticles(campus) {
    return (dispatch) => {
        dispatch(fetch_articles());
        service.getArticles(campus)
            .then((res) => {
                const articles = res;
                // console.log(articles)
                dispatch(articlesOk(articles.result));
            }).catch(err => dispatch(articlesFail()));
    };
}
