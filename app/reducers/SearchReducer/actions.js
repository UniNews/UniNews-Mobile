import * as types from './actionTypes';
import service from '../../services/news';

const search_request = () => {
    return { type: types.SEARCH_REQUEST };
}

const searchOk = (payload, text) => {
    return { type: types.SEARCH_OK, payload, text };
}

const searchFail = () => {
    return { type: types.SEARCH_FAIL };
}

export function search(text) {
    return (dispatch) => {
        dispatch(search_request());
        service.getAllArticles()
            .then((res) => {
                const articles = res.result;
                // console.log(articles)
                const newData = articles.filter(item => {
                    const itemData = `${item.title.toUpperCase()}   
                    ${item.user_id.toUpperCase()}
                    ${item.tag.join('\n').toUpperCase()}`;
                    // console.log("*****************************")
                    // console.log(itemData)
                    const queryData = text.toUpperCase();
                    return itemData.indexOf(queryData) > -1;
                });
                // console.log(newData)
                dispatch(searchOk(newData, text));
            }).catch(err => dispatch(searchFail()));
    };
}
