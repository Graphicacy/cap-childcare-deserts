import { combineReducers } from 'redux';
import { StateName } from '../data';
import { Action, ActionType } from './actions';

/**
 * type describing the entire app state
 */
export type State = Readonly<{
  selectedState: StateName;
  embed: boolean;
}>;

/**
 * State name selection reducer
 *
 * @param state previous app state
 * @param action redux action
 */
function selectedState(state: string = 'All states', action: Action) {
  switch (action.type) {
    case ActionType.SELECT_STATE: {
      return action.payload.name;
    }
    default:
      return state;
  }
}

function embed(state: boolean = false, action: Action) {
  return state;
}

/**
 * combine reducers into state properties
 */
export default combineReducers({
  selectedState,
  embed
});
