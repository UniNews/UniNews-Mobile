import * as types from './actionTypes';
import service from '../../services/news';

const search_request = () => {
    return { type: types.SEARCH_REQUEST };
}

const searchOk = (payload) => {
    return { type: types.SEARCH_OK, payload };
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
                console.log("CALLED")

                const newData = articles.filter(item => {
                    const itemData = `${item[Object.keys(item)[0]].title.toUpperCase()}   
                    ${item[Object.keys(item)[0]].user_id.toUpperCase()}
                    ${item[Object.keys(item)[0]].tag.join('\n').toUpperCase()}`;
                    // console.log("*****************************")
                    // console.log(itemData)

                    const queryData = text.toUpperCase();
                    return itemData.indexOf(queryData) > -1;
                });
                // console.log(newData)

                dispatch(searchOk(newData));
            }).catch(err => dispatch(searchFail()));
    };
}
