import * as types from './actionTypes';

const initialState = {
    loading: false,
    result: [],
    error: false,
    completed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                result: [],
                completed: false
            };
        case types.SEARCH_OK:
            return {
                ...state,
                loading: false,
                error: false,
                result: action.payload,
                completed: true
            };
        case types.SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                result: [],
                error: true,
                completed: true
            };
        default:
            return state;
    }
};

export default reducer;