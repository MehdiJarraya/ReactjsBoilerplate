import * as types from '../actions/actionTypes';

// A reducer is it is a function that's managing changes to some kind of object.
// first Argument is object thats contain out State (globalVars)
// second Argument is Object that describe the update we want to make

export default function (state = {
    n: 'diplome',
    data: [],
    indexRowsToUpdate: [],
    activeItem: null,
    error: null,
    // pagination Attributes
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
}, action = null) {
    switch (action.type) {
        case state.n + types.GET_ITEMS:
        console.log("actionpayload diplome",  action.payload)
        return {
            ...state, error: action.iserror,
            data: action.payload.data,
            current_page: action.payload.current_page,
            last_page: action.payload.last_page,
            per_page: action.payload.per_page,
            total: action.payload.total,
        }
        case state.n + types.SELECT_ITEM:
            return { ...state, activeItem: action.payload };
        case state.n + types.CREATE_ITEM:
            console.log("diplome add result", action.payload)
            return { ...state, data: [...state.data, action.payload] }
        case state.n + types.UPDATE_ITEM:
            return { ...state, data: state.data.map(i => i.id === action.id ? action.payload : i) };
        case state.n + types.DELETE_ITEM:
            console.log("diplome   action.id", action.id)
            return { ...state, data: state.data.filter(i => i.id !== action.id) };
        case state.n + types.UPDATE_DATA:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}