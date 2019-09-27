import * as types from '../actions/actionTypes';
import { createCookie, eraseCookie } from '../utils';

export default function (state = {
    isDrawerOpen: false,
    // i used the same var alert.show for displaying errror or sucess message so to hide the popup show value must be null
    alert: { show: null, message: '' },
    appLoading: false,
    userid: '',
    username: '',
    userrights: '',
     token: null,
    currentPage: 'Home Page',
    currentLanguage: 'fr',
    config: {
        // dateFormat: 'DD/MM/YYYY',
        // clientId: '6xhD55bBYls1YlawMiYREhsGGSyw',
        url: types.GLOBAL_URL + '/api',
    },
    profile: null,
    LeafletFgRef: null


}, action = null) {
    switch (action.type) {
        case types.TOGGLE_DRAWER:
            return { ...state, isDrawerOpen: action.payload };
        case types.APP_LOADING:
            return { ...state, appLoading: action.payload };
        case types.TOGGLE_ALERT:
            return { ...state, alert: { show: action.etat, message: action.payload } };

        case 'profile':
            console.log("profile from reducer", action.payload)
            if (action.payload) {
                createCookie('profile', JSON.stringify(action.payload));
            }
            return { ...state, profile: action.payload };

        case 'app_session' + types.CREATE_ITEM:
            // we are calling this  reducer from many action (login, singup, setToken) !!!!!
            console.log("from app_session ", action.payload)
            if (action.iserror) { return state; }
            if (action.payload.token) {
                createCookie('login_Token', JSON.stringify(action.payload.token));
            }
            if (action.payload.userid) {
                createCookie('userid', JSON.stringify(action.payload.userid));
            }
            return {
                ...state,
                token: action.payload.token ? action.payload.token : state.token,
                // we are calling this  reducer from many action (login, singup, setToken) setToken is not sending userid
                userid: action.payload.userid ? action.payload.userid : state.userid,

            };

        case 'app_session' + types.DELETE_ITEM:
            if (action.iserror) { return state; }
            eraseCookie('login_Token');
            eraseCookie('userid');
            return { ...state, token: '', userid: '', username: '', userrights: '' };
        case 'SET_CURRENTPAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_CURRENTLANGUAGE':
            return { ...state, currentLanguage: action.payload };

        case 'LeafletFgRef':
            return { ...state, LeafletFgRef: action.payload };

        default:
            return state;

    }
}