import 'es6-promise/auto';

import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { normalize, setupPage } from 'csstips';

import { initStore } from './store/';
import { App } from './components/';

const store = initStore();

normalize();
setupPage('#root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
