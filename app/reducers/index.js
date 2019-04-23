import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import campusReducer from './CampusReducer'

export default combineReducers({ authReducer, campusReducer });