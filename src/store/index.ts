import { default as reducer } from './reducers';
import { Action, ActionType, setSelectedState, Dispatch } from './actions';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import queryString from './query-string';

export * from './state';
export * from './actions';
export * from './reducers';

const logger = createLogger();

export function initStore() {
  const query = queryString();
  const store = createStore(
    reducer,
    {
      embed: query.embed
    },
    applyMiddleware(thunk, logger)
  );

  return store;
}
