import './shims';
import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { normalize } from 'csstips';

import { initStore } from './store/';
import { App } from './components/';

const store = initStore();

normalize();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
