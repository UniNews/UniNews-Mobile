import * as types from './actionTypes';

const initialState = {
    loading: false,
    error: false,
    completed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_FAVORITE:
            return {
                ...state,
                loading: true,
                error: false,
                completed: false
            };
        case types.FAVORITE_OK:
            return {
                ...state,
                loading: false,
                error: false,
                completed: true
            };
        case types.FAVORITE_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                completed: true
            };
        default:
            return state;
    }
};

export default reducer;