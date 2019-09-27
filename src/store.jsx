import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

//create redux store and pass to it combined reducer and used middelware
export default createStore(allReducers,
    compose(applyMiddleware(thunk)));