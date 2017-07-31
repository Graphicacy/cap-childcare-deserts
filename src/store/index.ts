import { default as reducer, State } from './reducers';
import { Action, ActionType, setSelectedState } from './actions';
import { createStore } from 'redux';

export { State, Action, ActionType, setSelectedState };

export function initStore(
  initialState: State = { selectedState: 'All states' }
) {
  const store = createStore(reducer, initialState);
  return store;
}
