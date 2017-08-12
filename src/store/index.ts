import { default as reducer } from './reducers';
import {
  Action,
  ActionType,
  setSelectedState,
  Dispatch,
  setScreenSize
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

  window.addEventListener('resize', () => {
    const size = window.innerWidth;
    const mobile = size <= 768;
    const { selectedState, screenSize } = store.getState() as State;
    const previouslyMobile = screenSize <= 768;

    store.dispatch(setScreenSize(size));
    if (selectedState === 'All states' && previouslyMobile !== mobile) {
      store.dispatch(setSelectedState(selectedState));
    }
  });

  return store;
}
