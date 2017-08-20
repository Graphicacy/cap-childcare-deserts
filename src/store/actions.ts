import { stateData, StateName } from '../data';
import {
  mobileStartZoom,
  startCenter,
  startZoom,
  stateZoom
} from './constants';
import { State, ToolTipData } from './state';

/**
 * enum of all redux action types
 */
export enum ActionType {
  SELECT_STATE = 'SELECT_STATE',
  SET_MAP_TARGET = 'SET_MAP_TARGET',
  SHOW_TOOLTIP = 'SHOW_TOOLTIP',
  HIDE_TOOLTIP = 'HIDE_TOOLTIP',
  MOUSE_MOVE = 'MOUSE_MOVE',
  SET_BOUNDS = 'SET_BOUNDS',
  SET_URBAN_FILTER = 'SET_URBAN_FILTER',
  SCREEN_RESIZE = 'SCREEN_RESIZE',
  MAP_READY = 'MAP_READY',
  ARTICLE_FOCUS_REQUEST = 'ARTICLE_FOCUS_REQUEST',
  ARTICLE_FOCUS_COMPLETE = 'ARTICLE_FOCUS_COMPLETE'
}

/**
 * union of all redux action types
 */
export type Action =
  | SelectStateAction
  | SetMapTargetAction
  | ShowTooltipAction
  | HideTooltipAction
  | MouseMoveAction
  | SetUrbanFilterAction
  | ScreenResizeAction
  | MapReadyAction
  | ArticleFocusAction
  | ArticleFocusCompleteAction;

/**
 * custom dispatch, with thunk support to allow
 * for typechecking of actions
 */
export type Dispatch = (
  action: Action | ((dispatch: Dispatch, getState: () => State) => void)
) => void;

/**
 *
 * mouse movement
 *
 */
interface MouseMoveAction {
  type: ActionType.MOUSE_MOVE;
  payload: {
    x: number;
    y: number;
  };
}

export const setMousePosition = (x: number, y: number): MouseMoveAction => ({
  type: ActionType.MOUSE_MOVE,
  payload: { x, y }
});

/**
 *
 * state selection
 *
 */

export const zoomToState = (name: StateName) => (
  dispatch: Dispatch,
  getState: () => State
) => {
  if (name !== 'All states') {
    const center = stateData[name].center.slice() as [number, number];
    const zoom = stateZoom.slice() as [number];
    dispatch(setMapTarget(zoom, center));
  } else {
    const { mobile } = getState();
    const zoom = (mobile ? mobileStartZoom : startZoom).slice() as [number];
    const center = startCenter.slice() as [number, number];
    dispatch(setMapTarget(zoom, center));
  }
};

interface SelectStateAction {
  type: ActionType.SELECT_STATE;
  payload: { name: StateName };
}

export const selectState = (name: StateName): SelectStateAction => ({
  type: ActionType.SELECT_STATE,
  payload: {
    name
  }
});

export const selectStateAndCenter = (name: StateName) => (
  dispatch: Dispatch
) => {
  dispatch(zoomToState(name));
  dispatch(hideTooltip());
  dispatch(selectState(name));
};

/**
 *
 * map positioning
 *
 */
interface SetMapTargetAction {
  type: ActionType.SET_MAP_TARGET;
  payload: {
    zoom: [number];
    center: [number, number];
  };
}

export const setMapTarget = (
  zoom: [number],
  center: [number, number]
): SetMapTargetAction => ({
  type: ActionType.SET_MAP_TARGET,
  payload: {
    center,
    zoom
  }
});

/**
 *
 * tooltip hide/show + position
 *
 */
interface ShowTooltipAction {
  type: ActionType.SHOW_TOOLTIP;
  payload: ToolTipData;
}

export const showTooltip = (payload: ToolTipData): ShowTooltipAction => ({
  type: ActionType.SHOW_TOOLTIP,
  payload
});

interface HideTooltipAction {
  type: ActionType.HIDE_TOOLTIP;
}

export const hideTooltip = (): HideTooltipAction => ({
  type: ActionType.HIDE_TOOLTIP
});

/**
 *
 * urbanicity filter buttons (when state is selected)
 *
 */
export enum UrbanicityFilter {
  ALL = 'All',
  RURAL = 'Rural',
  SUBURBAN = 'Suburban',
  URBAN = 'Urban'
}

export interface SetUrbanFilterAction {
  type: ActionType.SET_URBAN_FILTER;
  payload: UrbanicityFilter;
}

export const setUrbanFilter = (
  filter: UrbanicityFilter
): SetUrbanFilterAction => ({
  type: ActionType.SET_URBAN_FILTER,
  payload: filter
});

/**
 *
 * window size action (mobile/desktop)
 *
 */
export interface ScreenResizeAction {
  type: ActionType.SCREEN_RESIZE;
  payload: {
    mobile: boolean;
  };
}

export const setScreenSize = (mobile: boolean): ScreenResizeAction => {
  return {
    type: ActionType.SCREEN_RESIZE,
    payload: {
      mobile
    }
  };
};

/**
 *
 * mapbox load event
 *
 */

interface MapReadyAction {
  type: ActionType.MAP_READY;
}

export const mapReady = (): MapReadyAction => ({ type: ActionType.MAP_READY });

/**
 *
 * click "about the data" event
 *
 */
interface ArticleFocusAction {
  type: ActionType.ARTICLE_FOCUS_REQUEST;
}

export const focusArticle = (): ArticleFocusAction => ({
  type: ActionType.ARTICLE_FOCUS_REQUEST
});

interface ArticleFocusCompleteAction {
  type: ActionType.ARTICLE_FOCUS_COMPLETE;
}

export const focusArticleComplete = (): ArticleFocusCompleteAction => ({
  type: ActionType.ARTICLE_FOCUS_COMPLETE
});
