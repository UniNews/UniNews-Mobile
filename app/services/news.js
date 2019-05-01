import constants from '../config/constants';
import axios from 'axios';

export default {
    getArticles: async (campus) => {
        return await axios.get(`${constants.API_URL}/news/campus/${campus}`).then(response => response.data)
            .catch(error => error)
    },

    getArticle: async (id) => {
        return await axios.get(`${constants.API_URL}/news/${id}`).then(response => response.data)
            .catch(error => error)
    }
}