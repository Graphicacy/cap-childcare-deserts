import 'es6-promise/auto';

import { createElement } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { normalize, setupPage } from 'csstips';

import { App } from './components/';
import reducer from './reducers';

normalize();
setupPage('#root');

const initialState = {};
const store = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
