import { combineReducers } from 'redux';
import { Action, ActionType } from './actions';
import { TooltipState } from './state';

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

function center(
  state: [number, number] = [-100.343107, 38.424848],
  action: Action
) {
  switch (action.type) {
    case ActionType.SET_CENTER: {
      return action.payload.center;
    }

    default:
      return state;
  }
}

function zoom(state: [number] = [3], action: Action) {
  switch (action.type) {
    case ActionType.SET_ZOOM: {
      return action.payload.zoom;
    }

    default:
      return state;
  }
}

function tooltip(state: TooltipState = { show: false }, action: Action) {
  switch (action.type) {
    case ActionType.SHOW_TOOLTIP: {
      return {
        ...state,
        ...action.payload
      };
    }

    case ActionType.HIDE_TOOLTIP: {
      return {
        show: false
      };
    }

    default:
      return state;
  }
}

/**
 * combine reducers into state properties
 */
export default combineReducers({
  selectedState,
  embed,
  zoom,
  center,
  tooltip
});
