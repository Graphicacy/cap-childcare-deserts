import { default as reducer, State } from './reducers';
import { Action, ActionType, setSelectedState, Dispatch } from './actions';
import { createStore } from 'redux';
import queryString from './query-string';

export { State, Action, ActionType, setSelectedState, Dispatch };

export function initStore(
  initialState: State = { selectedState: 'All states', embed: false }
) {
  const query = queryString();
  const store = createStore(reducer, {
    ...initialState,
    embed: query.embed
  });

  return store;
}
