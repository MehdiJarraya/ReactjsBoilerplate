import { combineReducers } from 'redux';
import app from './appReducer';


import diplome from './diplomeReducer'
export default combineReducers({
    app,
    diplome,

});