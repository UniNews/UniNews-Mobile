import * as types from './actionTypes';

const initialState = {
    user: null,
    error: null,
    isLoading: false,
    isAuthenticated: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SESSION_LOADING:
            return { ...state, isLoading: true, error: null };
        case types.SESSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: null,
                isAuthenticated: true,
            };
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: null,
                isAuthenticated: false,
            };
        case types.SESSION_ERROR:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.error,
                isAuthenticated: false,
            };
        case types.SET_INITIAL_STATE:
            return initialState;
        case types.GET_PROFILE:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default reducer;