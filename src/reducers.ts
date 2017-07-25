import { combineReducers } from 'redux';
import { StateName } from './states';
import { Action, ActionType } from './actions';

/**
 * type describing the entire app state
 */
export type State = Readonly<{
  selectedState: StateName | null;
}>;

/**
 * State name selection reducer
 *
 * @param state previous app state
 * @param action redux action
 */
function selectedState(state: string | null = null, action: Action) {
  switch (action.type) {
    case ActionType.SELECT_STATE: {
      return action.payload.name;
    }
    default:
      return state;
  }
}

/**
 * combine reducers into state properties
 */
export default combineReducers({
  selectedState
});
