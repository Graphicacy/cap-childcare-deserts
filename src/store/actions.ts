import { StateName, stateData } from '../data';
import { ToolTipData } from './state';
import {
  startZoom,
  startCenter,
  stateZoom,
  mobileStartZoom
} from './constants';
import { State } from './state';

export enum ActionType {
  SELECT_STATE = 'SELECT_STATE',
  SET_MAP_TARGET = 'SET_MAP_TARGET',
  SHOW_TOOLTIP = 'SHOW_TOOLTIP',
  HIDE_TOOLTIP = 'HIDE_TOOLTIP',
  MOUSE_MOVE = 'MOUSE_MOVE',
  SHOW_LEGEND = 'SHOW_LEGEND',
  HIDE_LEGEND = 'HIDE_LEGEND',
  SET_BOUNDS = 'SET_BOUNDS',
  SET_URBAN_FILTER = 'SET_URBAN_FILTER',
  SCREEN_RESIZE = 'SCREEN_RESIZE',
  MAP_READY = 'MAP_READY',
  ARTICLE_FOCUS_REQUEST = 'ARTICLE_FOCUS_REQUEST',
  ARTICLE_FOCUS_COMPLETE = 'ARTICLE_FOCUS_COMPLETE'
}

export type Action =
  | SelectStateAction
  | SetMapTargetAction
  | SetBoundsAction
  | ShowTooltipAction
  | HideTooltipAction
  | MouseMoveAction
  | ShowLegendAction
  | HideLegendAction
  | SetUrbanFilterAction
  | ScreenResizeAction
  | MapReadyAction
  | ArticleFocusAction
  | ArticleFocusCompleteAction;

export type Dispatch = (
  action: Action | ((dispatch: Dispatch, getState: () => State) => void)
) => void;

type MouseMoveAction = {
  type: ActionType.MOUSE_MOVE;
  payload: {
    x: number;
    y: number;
  };
};

export const setMousePosition = (x: number, y: number) =>
  ({
    type: ActionType.MOUSE_MOVE,
    payload: { x, y }
  } as MouseMoveAction);

type SelectStateAction = {
  type: ActionType.SELECT_STATE;
  payload: { name: StateName };
};

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

export const setSelectedState = (name: StateName) => (dispatch: Dispatch) => {
  dispatch(zoomToState(name));
  dispatch(hideTooltip());
  dispatch(
    {
      type: ActionType.SELECT_STATE,
      payload: {
        name
      }
    } as SelectStateAction
  );
};

type SetMapTargetAction = {
  type: ActionType.SET_MAP_TARGET;
  payload: {
    zoom: [number];
    center: [number, number];
  };
};

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

type ShowTooltipAction = {
  type: ActionType.SHOW_TOOLTIP;
  payload: ToolTipData;
};

export const showTooltip = (payload: ToolTipData) =>
  ({
    type: ActionType.SHOW_TOOLTIP,
    payload
  } as ShowTooltipAction);

type HideTooltipAction = {
  type: ActionType.HIDE_TOOLTIP;
};

export const hideTooltip = () =>
  ({ type: ActionType.HIDE_TOOLTIP } as HideTooltipAction);

type ShowLegendAction = {
  type: ActionType.SHOW_LEGEND;
};

export const showLegend = () =>
  ({
    type: ActionType.SHOW_LEGEND
  } as ShowLegendAction);

type HideLegendAction = {
  type: ActionType.HIDE_LEGEND;
};

export const hideLegend = () =>
  ({
    type: ActionType.HIDE_LEGEND
  } as HideLegendAction);

type SetBoundsAction = {
  type: ActionType.SET_BOUNDS;
  payload: {
    bounds: number[][];
  };
};

export const setBounds = (bounds: number[][] | null) =>
  ({
    type: ActionType.SET_BOUNDS,
    payload: { bounds }
  } as SetBoundsAction);

export enum UrbanicityFilter {
  ALL = 'All',
  RURAL = 'Rural',
  SUBURBAN = 'Suburban',
  URBAN = 'Urban'
}

export type SetUrbanFilterAction = {
  type: ActionType.SET_URBAN_FILTER;
  payload: UrbanicityFilter;
};

export const setUrbanFilter = (filter: UrbanicityFilter) =>
  ({
    type: ActionType.SET_URBAN_FILTER,
    payload: filter
  } as SetUrbanFilterAction);

export type ScreenResizeAction = {
  type: ActionType.SCREEN_RESIZE;
  payload: {
    mobile: boolean;
  };
};

export const setScreenSize = (mobile: boolean) => {
  return {
    type: ActionType.SCREEN_RESIZE,
    payload: {
      mobile
    }
  } as ScreenResizeAction;
};

type MapReadyAction = {
  type: ActionType.MAP_READY;
};

export const mapReady = () =>
  ({ type: ActionType.MAP_READY } as MapReadyAction);

type ArticleFocusAction = {
  type: ActionType.ARTICLE_FOCUS_REQUEST;
};

export const focusArticle = (): ArticleFocusAction => ({
  type: ActionType.ARTICLE_FOCUS_REQUEST
});

type ArticleFocusCompleteAction = {
  type: ActionType.ARTICLE_FOCUS_COMPLETE;
};

export const focusArticleComplete = (): ArticleFocusCompleteAction => ({
  type: ActionType.ARTICLE_FOCUS_COMPLETE
});
