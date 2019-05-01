import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import campusReducer from './CampusReducer'
import newsReducer from './NewsReducer'
import detailReducer from './DetailReducer'


export default combineReducers({ authReducer, campusReducer, newsReducer, detailReducer });