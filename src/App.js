import { CircularProgress } from '@material-ui/core/';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import { setProfile, setToken, setUserid } from './actions';
import './App.css';
import NotificationAndSnackbar from './application/Components/NotificationSnackbars';
import Drawer from './application/Drawer';
import Login from './application/Login';
import Register from './application/Register';
import { readCookie } from './utils';

function App(props) {
  const dispatch = useDispatch()
  const { appLoading } = useSelector(store => store.app, shallowEqual)

  // This will run only once. because the second parameter here is an (empty array).
  // Without the second parameter the useEffect hook will be called on every render
  useEffect(() => {
    var loginToken = readCookie('login_Token');
    if (loginToken) {
      dispatch(setToken(JSON.parse(loginToken)));
    }

    var userid = readCookie('userid');
    if (userid) {
      dispatch(setUserid(JSON.parse(userid)));
    }

    var profile = readCookie('profile');
    if (profile) {
      dispatch(setProfile(JSON.parse(profile)));
    }

  }, []);



  return (
    <div>
      <div style={{
        visibility: appLoading ? 'visible' : 'hidden',
        position: 'absolute',
        left: '50%',
        top: '45%',

      }}>
        <CircularProgress size={50} />
      </div>
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10, minHeight: '100vh', 
        opacity: appLoading ? 0.4 : 1
      }} >

        <NotificationAndSnackbar />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* <Route exact path="/register" component={Register} />
            <Route exact path="/forgetpassword" component={Forgetpassword} />
            <Route exact path="/resetPassword/:token" component={ResetPassword} /> */}
            {/* exact: bool-> When true, the active class/style will only be applied if the location is matched exactly. */}
            {/* Be carefull !!! : when using navigation drawer for example exact has to be false otherwise the drawer will not be displayed in sub Page path ( example /drawer/sites -> will return blank page) */}
            <Route path="/drawer" component={Drawer} />
          </div>
        </BrowserRouter>


      </div>
    </div>
  );
}


export default App;
