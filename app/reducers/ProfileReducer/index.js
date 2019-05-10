import * as types from './actionTypes';

const initialState = {
    /* PROFILE STATE */
    loading: false,
    error: false,
    completed: false,
    profile: {},

    // /* FAVORITE STATE */
    // favorite_loading: false,
    // favorite_error: false,
    // favorite_completed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PROFILE:
            /* PROFILE REDUCER */
            return {
                ...state,
                loading: true,
                error: false,
                completed: false,
                profile: {},
            };
        case types.PROFILE_OK:
            return {
                ...state,
                loading: false,
                error: false,
                completed: true,
                profile: action.payload,
            };
        case types.PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                completed: true,
                profile: {},
            };
        /* FAVORITE REDUCER */
        // case types.REQUEST_FAVORITE:
        //     return {
        //         ...state,
        //         favorite_loading: true,
        //         favorite_error: false,
        //         favorite_completed: false
        //     };
        // case types.FAVORITE_OK:
        //     return {
        //         ...state,
        //         favorite_loading: false,
        //         favorite_error: false,
        //         favorite_completed: true
        //     };
        // case types.FAVORITE_FAIL:
        //     return {
        //         ...state,
        //         favorite_loading: false,
        //         favorite_error: true,
        //         favorite_completed: true
        //     };
        default:
            return state;
    }
};

export default reducer;