import constants from '../config/constants';
import axios from 'axios';

export default {
    getArticles: async (campus) => {
        return await axios.get(`${constants.API_URL}/news/${campus}`).then(response => response.data)
            .catch(error => error)
    }
}