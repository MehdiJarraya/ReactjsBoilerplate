import axios from 'axios';
import * as types from '../actions/actionTypes';
import { dispatchAlert, dispatchSucess } from '../actions';
import https from 'https';


// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});

//Promise based HTTP client for the browser to consume web service
export const gAxios = (token, url, method = 'get', data = {}, headers = {}) => {
    return axios({
        url: url,
        data: data,
        timeout: 10000,
        method: method,
        responseType: 'json',
        headers: { ...headers, 'Accept': 'application/json', 'Authorization': 'Bearer ' + token},
        httpsAgent: agent

    });
};


export const postFile = (n, url, key, file, cb = null) => {
    console.log("from postFile  ", file[0])
    return function (dispatch, getState) {
        dispatch({ type: types.APP_LOADING, payload: true });//call reducer to set loading to "true"(start loading)
        let data = new FormData();
        data.append(key, file[0]);

        //call upload file web serice then call reducer to set new changes
        return gAxios(getState().app.token, getState().app.config.url + url, 'post', data).then(function (r) {
            console.log('Post File Sucess ', r)
            dispatch({
                type: n + types.GET_ITEMS,
                payload: r.data,
                iserror: false,
            });
        }).catch(function (r) {
            console.log('Post File Error  ', r)
            dispatchAlert(dispatch, 'Erreur serveur : ' + ((r.response) ? r.response.status : ''));//call dispatchAlert action 

        }).then(function (r) {
            dispatch({ type: types.APP_LOADING, payload: false });//call reducer to set loading to "false"(stop loading) 
        });


    }
}


/**
 * Central function to execute Get Queries on URL 
 * 
 * @param {String} n : Action Name to Dispatch on Success
 * @param {String} url : URL to get Data from
 * @param {Function} cb : CallBack Function to execute on success
 */
export const getData = (n, url, cb = null) => {

// with redux Thunk (action return) is a function that contain two params 1-dispatch 2- getState()-> function contain application store (all reducer)
    return function (dispatch, getState) {
        dispatch({ type: types.APP_LOADING, payload: true });//call reducer to set loading to "true"(start loading)
        //** consume the web service using get method to get the list of items then call reducer to set new changes**
        return gAxios(getState().app.token, getState().app.config.url + url).then(function (r) {
            dispatch({
                // type:  n == "profile" ? n : n + types.GET_ITEMS,
                type: n,
                payload: r.data,
                iserror: false,
            });
            if (cb) { setTimeout(function () { cb(r); }, 10); }
        }).catch(function (r) {
            dispatchAlert(dispatch, 'Erreur serveur : ' + ((r.response) ? r.response.status : ''));//call dispatchAlert action 

            if (cb) { setTimeout(function () { cb(r.response); }, 10); }
        }).then(function (r) {
            dispatch({ type: types.APP_LOADING, payload: false });//call reducer to set loading to "false"(stop loading) 
        });
    }
}



export const postData = (n, url, data, cb = null) => {
    return function (dispatch, getState) {
        dispatch({ type: types.APP_LOADING, payload: true });//call reducer to set loading to "true"(start loading)
        //** consume the web service using post method to pass new item as data then call reducer to set new changes**
        console.log('postData url: ' + getState().app.config.url + url);
        return gAxios(getState().app.token, getState().app.config.url + url, 'post', data).then(function (r) {
            dispatch({
                type: n + types.CREATE_ITEM,
                payload: r.data,
                iserror: false
            });
            dispatchSucess(dispatch);//call dispatch sucess to show sucess message action 
            if (cb) { setTimeout(function () { cb(r); }, 10); }
        }).catch(function (r) {
            dispatchAlert(dispatch, r.response? (r.response.data?r.response.data.message:'')  :  'Welcome' ) ;//call dispatchAlert action 
            if (cb) { setTimeout(function () { cb(r.response); }, 10); }
        }).then(function (r) { dispatch({ type: types.APP_LOADING, payload: false }); });//call reducer to set loading to "false"(stop loading) 
    }
}




export const putData = (n, url, id, data, cb = null) => {
    return function (dispatch, getState) {
        dispatch({ type: types.APP_LOADING, payload: true });//call reducer to set loading to "true"(start loading)
        //** */consume the web service using put method to update an item  then call reducer to set new changes**
        return gAxios(getState().app.token, getState().app.config.url + url + id, 'put', data).then(function (r) {
            dispatch({
                type: n + types.UPDATE_ITEM,
                id: id,
                //  payload: n == 'lieu' ||  n == 'unite'? r.data : data, 
                payload : r.data, 
                iserror: false
            });
        }).catch(function (r) {
            dispatchAlert(dispatch, 'Erreur serveur : ' + ((r.response) ? r.response.status : ''));//call dispatchAlert action 
        }).then(function (r) {
            dispatch({ type: types.APP_LOADING, payload: false });});//call reducer to set loading to "false"(stop loading)
        
    }
}

export const deleteData = (n, url, id, cb = null) => {
    return function (dispatch, getState) {
        dispatch({ type: types.APP_LOADING, payload: true });//call reducer to set loading to "true"(start loading)
        //** */consume the web service using delete method to delete an item  then call reducer to set new changes**
        return gAxios(getState().app.token, getState().app.config.url + url + id, 'delete').then(function (r) {
            dispatch({
                type: n + types.DELETE_ITEM,
                id: id,
                iserror: false
            });
        }).catch(function (r) {
            dispatchAlert(dispatch, 'Erreur serveur : ' + ((r.response) ? r.response.status : ''));//call dispatchAlert action 
        }).then(function (r) {
            dispatch({ type: types.APP_LOADING, payload: false });//call reducer to set loading to "false"(stop loading) 
        });
    }
}


