import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/uikit/dist/css/uikit.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './appState/reducers';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
