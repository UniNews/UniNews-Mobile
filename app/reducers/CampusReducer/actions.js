import * as types from './actionTypes';
import service from '../../services/campus';

const fetch_campus = () => {
    return { type: types.FETCH_CAMPUS };
}

const campusOk = (payload) => {
    return { type: types.CAMPUS_OK, payload };
}

const campusFail = () => {
    return { type: types.CAMPUS_FAIL };
}

const campusSelect = (payload) => {
    return { type: types.SELECT_CAMPUS, payload };

}

export function getCampus() {
    return (dispatch) => {
        dispatch(fetch_campus());

        // return service
        //     .getCampus()
        //     .then(response => response.json())
        //     .then(response => dispatch(campusOk(response)))
        //     .catch(err => dispatch(campusFail()));

        // mock เฉยๆ
        let response = service.getCampus()
        dispatch(campusOk(response))
    };
}
export function selectCampus(campus) {
    return (dispatch) => {
        dispatch(campusSelect(campus));
    };
}