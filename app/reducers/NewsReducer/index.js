import * as types from './actionTypes';

const initialState = {
    loading: false,
    articles: [],
    error: false,
    completed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ARTICLES:
            return {
                ...state,
                loading: true,
                error: false,
                articles: [],
                completed: false
            };
        case types.ARTICLES_OK:
            return {
                ...state,
                loading: false,
                error: false,
                articles: action.payload,
                completed: true
            };
        case types.ARTICLES_FAIL:
            return {
                ...state,
                loading: false,
                articles: [],
                error: true,
                completed: true
            };
        default:
            return state;
    }
};

export default reducer;