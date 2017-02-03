import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import application from './application';
import data from './data';

export default combineReducers({
    application,
    router: routerStateReducer,
    data
});