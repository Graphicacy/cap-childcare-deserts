import 'spectre.css/dist/spectre.css';
import 'es6-promise/auto';
import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './components/';
import reducer from './reducers';

/**
 * TODO: add history
 */
const initialState = {};
const store = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
