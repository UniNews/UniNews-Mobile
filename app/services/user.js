import constants from '../config/constants';

export default {

    // getCampus: () => fetch(`${constants.API_URL}/campus`, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json'
    //     },
    // })

    // mock เฉยๆ
    getProfile: (uid) => fetch(constants.API_URL+'/user/'+uid,{
        method: 'GET'
    })
}