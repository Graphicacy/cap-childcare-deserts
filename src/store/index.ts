import { default as reducer } from './reducers';
import {
  Action,
  ActionType,
  setSelectedState,
  Dispatch,
  setScreenSize,
  setZoomLevel
} from './actions';
import { startZoom, mobileStartZoom } from './constants';
import { State } from './state';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import queryString from './query-string';

export * from './state';
export * from './actions';
export * from './reducers';

const middleware = [thunk];

// if (__DEV__) {
//   const { createLogger } = require('redux-logger');
//   const logger = createLogger({ collapsed: true });
//   middleware.push(logger);
// }

export function initStore() {
  // TODO: put behind __DEV__ webpack flag
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const query = queryString();
  const store = createStore(
    reducer,
    {
      embed: query.embed
    },
    composeEnhancers(applyMiddleware(...middleware))
  );

  let resizeTimeout: any;
  window.addEventListener('resize', () => {
    // debounce
    clearInterval(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const size = window.innerWidth;
      const mobile = size <= 768;
      const {
        selectedState,
        mobile: previouslyMobile
      } = store.getState() as State;
      store.dispatch(setScreenSize(mobile));
      store.dispatch(setSelectedState(selectedState));
    }, 500);
  });

  return store;
}
