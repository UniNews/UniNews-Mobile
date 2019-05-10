import constants from '../config/constants';
import axios from 'axios';

import { getToken } from './user'
import firebase from './../config/firebase'


export default {
    getArticles: async (campus) => {
        return await axios.get(`${constants.API_URL}/news/campus/${campus}`).then(response => response.data)
            .catch(error => error)
    },

    getAllArticles: async () => {
        return await axios.get(`${constants.API_URL}/news/`).then(response => response.data)
            .catch(error => error)
    },

    getArticle: async (id) => {
        return await axios.get(`${constants.API_URL}/news/${id}`).then(response => response.data)
            .catch(error => error)
    },

    postFavorite: async (idToken, id) => {
        return await axios.post(`${constants.API_URL}/news/${id}/rating`, {
            user_token: idToken,
        }).then(response => response.data)
            .catch(error => error)
    },

    postComment: async (idToken, id, msg) => {
        return await axios.post(`${constants.API_URL}/news/${id}/comments`, {
            user_token: idToken,
            msg: msg
        }).then(response => response.data)
            .catch(error => error)
    },

    postNews: async (idToken, catalog, description, imgs, title, tag) => {
        return await axios.post(`${constants.API_URL}/news/addnews`, {
            user_token: idToken,
            catalog: catalog,
            description: description,
            imgs: imgs,
            title: title,
            tag: tag
        }).then(response => response.data)
            .catch(error => error)
    },
}