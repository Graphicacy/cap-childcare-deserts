import { combineReducers } from 'redux';
import { Action, ActionType, UrbanicityFilter } from './actions';
import { TooltipState } from './state';
import { startZoom, startCenter, mobileStartZoom } from './constants';

const INITIAL_WINDOW_SIZE = window.innerWidth <= 768;

const INITIAL_ZOOM = INITIAL_WINDOW_SIZE
  ? mobileStartZoom as [number]
  : startZoom as [number];

const INITIAL_CENTER = startCenter as [number, number];

/**
 * combine reducers into state properties
 */
export default combineReducers({
  selectedState,
  embed,
  tooltip,
  mouse,
  showLegend,
  bounds,
  urbanicityFilter,
  mobile,
  mapReady,
  articleFocus,
  mapTarget
});

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

function tooltip(state: TooltipState = { show: false }, action: Action) {
  switch (action.type) {
    case ActionType.SHOW_TOOLTIP: {
      return {
        data: action.payload,
        show: true
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

function mouse(state = { x: 0, y: 0 }, action: Action) {
  switch (action.type) {
    case ActionType.MOUSE_MOVE: {
      return action.payload;
    }

    default:
      return state;
  }
}

function showLegend(state = true, action: Action) {
  switch (action.type) {
    case ActionType.SHOW_LEGEND:
      return true;
    case ActionType.HIDE_LEGEND:
      return false;
    default:
      return state;
  }
}

function bounds(state = null, action: Action) {
  switch (action.type) {
    case ActionType.SET_BOUNDS: {
      return action.payload.bounds;
    }

    default:
      return state;
  }
}

function urbanicityFilter(state = UrbanicityFilter.ALL, action: Action) {
  switch (action.type) {
    case ActionType.SET_URBAN_FILTER: {
      return action.payload;
    }

    default:
      return state;
  }
}

function mobile(state = INITIAL_WINDOW_SIZE, action: Action) {
  switch (action.type) {
    case ActionType.SCREEN_RESIZE: {
      return action.payload.mobile;
    }

    default:
      return state;
  }
}

function mapReady(state = false, action: Action) {
  switch (action.type) {
    case ActionType.MAP_READY: {
      return true;
    }

    default:
      return state;
  }
}

function articleFocus(state = false, action: Action) {
  switch (action.type) {
    case ActionType.ARTICLE_FOCUS_COMPLETE: {
      return false;
    }
    case ActionType.ARTICLE_FOCUS_REQUEST: {
      return true;
    }

    default:
      return state;
  }
}

function mapTarget(
  state: { zoom: [number]; center: [number, number] } = {
    zoom: INITIAL_ZOOM,
    center: INITIAL_CENTER
  },
  action: Action
) {
  switch (action.type) {
    case ActionType.SET_MAP_TARGET: {
      return { ...action.payload };
    }

    default:
      return state;
  }
}
