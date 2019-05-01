import * as types from './actionTypes';

const initialState = {
    loading: false,
    article: {},
    error: false,
    completed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ARTICLE:
            return {
                ...state,
                loading: true,
                error: false,
                article: {},
                completed: false
            };
        case types.ARTICLE_OK:
            return {
                ...state,
                loading: false,
                error: false,
                article: action.payload,
                completed: true
            };
        case types.ARTICLE_FAIL:
            return {
                ...state,
                loading: false,
                article: {},
                error: true,
                completed: true
            };
        default:
            return state;
    }
};

export default reducer;