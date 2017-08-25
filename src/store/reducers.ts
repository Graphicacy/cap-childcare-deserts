import { combineReducers } from 'redux';
import { Action, ActionType, UrbanicityFilter } from './actions';
import { mobileStartZoom, startCenter, startZoom } from './constants';
import { State, TooltipState } from './state';

const INITIAL_WINDOW_SIZE = window.innerWidth <= 768;

const INITIAL_ZOOM = INITIAL_WINDOW_SIZE
  ? mobileStartZoom as [number]
  : startZoom as [number];

const INITIAL_CENTER = startCenter as [number, number];

/**
 * combine reducers into state properties
 */
export default combineReducers<State>({
  selectedState,
  embed,
  tooltip,
  mouse,
  urbanicityFilter,
  mobile,
  mapReady,
  articleFocus,
  mapTarget
});

/**
 * set current selected US state with data, or 'All states'
 *
 * @param state state name
 * @param action
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

/**
 * mark if the app should be in embed mode
 *
 * @param state
 * @param action
 */
function embed(state: boolean = false, action: Action) {
  return state;
}

/**
 * set state for chart/map tooltips
 *
 * @param state map position + show/hide state
 * @param action
 */
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

/**
 * set mouse position state
 *
 * @param state
 * @param action
 */
function mouse(state = { x: 0, y: 0 }, action: Action) {
  switch (action.type) {
    case ActionType.MOUSE_MOVE: {
      return action.payload;
    }

    default:
      return state;
  }
}

/**
 * set urbanicity filter (when state selected)
 *
 * @param state
 * @param action
 */
function urbanicityFilter(state = UrbanicityFilter.ALL, action: Action) {
  switch (action.type) {
    case ActionType.SET_URBAN_FILTER: {
      return action.payload;
    }

    default:
      return state;
  }
}

/**
 * mobile / desktop mode
 *
 * @param state
 * @param action
 */
function mobile(state = INITIAL_WINDOW_SIZE, action: Action) {
  switch (action.type) {
    case ActionType.SCREEN_RESIZE: {
      return action.payload.mobile;
    }

    default:
      return state;
  }
}

/**
 * mapbox ready event
 *
 * @param state
 * @param action
 */
function mapReady(state = false, action: Action) {
  switch (action.type) {
    case ActionType.MAP_READY: {
      return true;
    }

    default:
      return state;
  }
}

/**
 * scroll to article event
 *
 * @param state
 * @param action
 */
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

/**
 * map positioning data
 *
 * @param state
 * @param action
 */
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
