import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import * as serviceWorker from './serviceWorker';
import App from './component/App/App';
import reducer from './store/reducer';

import './css/index.css';
import './css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={ createStore(reducer) }>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
