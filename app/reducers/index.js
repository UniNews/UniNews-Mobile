import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import campusReducer from './CampusReducer'
import newsReducer from './NewsReducer'
import detailReducer from './DetailReducer'
import favoriteReducer from './FavoriteReducer'
import searchReducer from './SearchReducer'


export default combineReducers({ authReducer, campusReducer, newsReducer, detailReducer, favoriteReducer, searchReducer });