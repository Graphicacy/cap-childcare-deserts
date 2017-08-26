import './shims';

import { normalize } from 'csstips';
import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { setStylesTarget } from 'typestyle';

import { App } from './components/';
import { initStore } from './store/';

const store = initStore();
const root = document.getElementById('root');
const stylesTarget = document.getElementById('styles-target');

normalize();
setStylesTarget(stylesTarget!);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
