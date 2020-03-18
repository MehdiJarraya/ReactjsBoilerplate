import * as types from "./actionTypes";
import * as cruds from "./cruds";

export const toggleDrawer = trueorfalse => {
  return {
    type: types.TOGGLE_DRAWER,
    payload: trueorfalse
  };
};

export const dispatchAlert = (dispatch, message) => {
  dispatch({
    type: types.TOGGLE_ALERT,
    payload: message,
    etat: 2
  });
};

export const showAlert = message => {
  return function(dispatch, getState) {
    dispatchAlert(dispatch, message);
  };
};

export const dispatchSucess = (dispatch, message) => {
  dispatch({
    type: types.TOGGLE_ALERT,
    payload: message,
    etat: 1
  });
};

export const showSucess = message => {
  return function(dispatch, getState) {
    dispatchAlert(dispatch, message);
  };
};

export const hideAlertAndSucess = () => {
  return function(dispatch, getState) {
    dispatch({
      type: types.TOGGLE_ALERT,
      payload: "",
      etat: null
    });
  };
};

export const toggleDialogAddRule = (row, index) => {
  return {
    type: "rule" + types.TOGGLE_ADD_DIALOG
  };
};

export const setToken = loginToken => {
  return {
    type: "app_session" + types.CREATE_ITEM,
    payload: {
      token: loginToken
    },
    iserror: false
  };
};

export const setUserid = userid => {
  return {
    type: "app_session" + types.CREATE_ITEM,
    payload: {
      userid: userid
    },
    iserror: false
  };
};

export const setProfile = profile => {
  return {
    type: "profile",
    payload: profile,
    iserror: false
  };
};

export const setCurrentPage = currentPage => {
  return {
    type: "SET_CURRENTPAGE",
    payload: currentPage
  };
};

export const setCurrentLanguage = language => {
  return {
    type: "SET_CURRENTLANGUAGE",
    payload: language
  };
};


export const register = (o, navigationHistory) => {
  return (dispatch, getState) => {
    dispatch(cruds.postData("app_session", "/authentification/signup", o)).then((r) => {
      navigationHistory.push("/drawer/users");
    })
  };
};

export const resetUserPassword = o => {
  // lorsque l'url est introuvable 404 request method will be automaticly OPTION
  return cruds.postData("reset_password", "/password/create", o);
};

export const newUserPassword = o => {
  // lorsque l'url est introuvable 404 request method will be automaticly OPTION
  return cruds.postData("reset_password", "/password/reset", o);
};

export const setNotfication = msg => {
  console.log("from action notification ", msg);
  return {
    type: types.TOGGLE_ALERT,
    payload: msg,
    etat: 3
  };
};

export const displayWarning = msg => {
  return {
    type: types.TOGGLE_ALERT,
    payload: msg,
    etat: 4
  };
};

export const loginUser = (o, navigationHistory) => {
  return (dispatch, getState) => {
    dispatch(cruds.postData("app_session", "/authentification/signin", o)).then(() => {
      navigationHistory.push("/drawer/users");
    });
  };
};

export const loadDiplome = (f = "", page = "1", orderBy = "", order = "") => {
  return cruds.getData(
    "diplome" + types.GET_ITEMS,
    "/diplome?page=" + page + "&" + f + "&" + orderBy + "&" + order
  );
};

export const createDiplome = item => {
  return cruds.postData("diplome", "/diplome", item);
};
export const deleteDiplome = itemId => {
  return cruds.deleteData("diplome", "/diplome/", itemId);
};
export const updateDiplome = o => {
  return cruds.putData("diplome", "/diplome/", o.id, o);
};
