import { default as reducer } from './reducers';
import { Action, ActionType, setSelectedState, Dispatch } from './actions';
import { createStore, applyMiddleware } from 'redux';
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
  const query = queryString();
  const store = createStore(
    reducer,
    {
      embed: query.embed
    },
    applyMiddleware(...middleware)
  );

  return store;
}
