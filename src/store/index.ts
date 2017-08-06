import { default as reducer } from './reducers';
import { Action, ActionType, setSelectedState, Dispatch } from './actions';
import { createStore } from 'redux';
import queryString from './query-string';

export * from './state';
export * from './actions';
export * from './reducers';

export function initStore() {
  const query = queryString();
  const store = createStore(reducer, {
    embed: query.embed
  });

  return store;
}
