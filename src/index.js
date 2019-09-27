import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Global First Component that contain the hole application
import './index.css';
import { Provider } from 'react-redux'
import store from './store';// our redux store which contain combined reducer and used middelware
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  //we pass store to provider to intialize redux
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// serviceWorker.unregister();