import constants from '../config/constants';

export default {
    getProfile: (uid) => fetch(constants.API_URL + '/user/' + uid, {
        method: 'GET'
    })
}