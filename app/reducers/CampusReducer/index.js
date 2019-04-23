import * as types from './actionTypes';

const initialState = {
    selectedCampus: "",
    loading: false,
    campus: [],
    error: false,
    completed: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CAMPUS:
            return {
                ...state,
                loading: true,
                error: false,
                campus: [],
                completed: false
            };
        case types.SELECT_CAMPUS:
            return {
                ...state,
                selectedCampus: action.payload
            }
        case types.CAMPUS_OK:
            return {
                ...state,
                selectedCampus: action.payload[0].name, // default index
                loading: false,
                error: false,
                campus: action.payload,
                completed: true
            };
        case types.CAMPUS_FAIL:
            return {
                ...state,
                loading: false,
                campus: [],
                error: true,
                completed: true
            };
        default:
            return state;
    }
};

export default reducer;
