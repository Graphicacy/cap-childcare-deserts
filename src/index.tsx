import { normalize } from 'csstips';
import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './shims';

import { App } from './components/';
import { initStore } from './store/';

const store = initStore();

normalize();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
