import reducer from './reducers';
import { createStore } from 'redux';

export { Action, ActionType, setSelectedState } from './actions';
export { State } from './reducers';

export function initStore(initialState = {}) {
  const store = createStore(reducer, initialState);
  return store;
}
