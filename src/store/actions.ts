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
  SET_ZOOM = 'SET_ZOOM',
  SET_CENTER = 'SET_CENTER',
  SHOW_TOOLTIP = 'SHOW_TOOLTIP',
  HIDE_TOOLTIP = 'HIDE_TOOLTIP',
  MOUSE_MOVE = 'MOUSE_MOVE',
  SHOW_LEGEND = 'SHOW_LEGEND',
  HIDE_LEGEND = 'HIDE_LEGEND',
  SET_BOUNDS = 'SET_BOUNDS',
  SET_URBAN_FILTER = 'SET_URBAN_FILTER',
  SCREEN_RESIZE = 'SCREEN_RESIZE'
}

export type Action =
  | SelectStateAction
  | SetZoomLevelAction
  | SetCenterAction
  | SetBoundsAction
  | ShowTooltipAction
  | HideTooltipAction
  | MouseMoveAction
  | ShowLegendAction
  | HideLegendAction
  | SetUrbanFilterAction
  | ScreenResizeAction;

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
    // const [lon1, lon2, lat1, lat2] = stateData[name].bounds;
    // dispatch(setBounds([[lat1, lon1], [lat2, lon2]]));
    dispatch(setCenter(stateData[name].center.slice() as [number, number]));
    dispatch(setZoomLevel(stateZoom.slice() as [number]));
  } else {
    const { mobile } = getState();
    dispatch(setCenter(startCenter.slice() as [number, number]));
    dispatch(
      setZoomLevel((mobile ? mobileStartZoom : startZoom).slice() as [number])
    );
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

type SetZoomLevelAction = {
  type: ActionType.SET_ZOOM;
  payload: {
    zoom: [number];
  };
};

export const setZoomLevel = (zoom: [number]) =>
  ({
    type: ActionType.SET_ZOOM,
    payload: {
      zoom
    }
  } as SetZoomLevelAction);

type SetCenterAction = {
  type: ActionType.SET_CENTER;
  payload: {
    center: [number, number];
  };
};

export const setCenter = (center: [number, number]) =>
  ({
    type: ActionType.SET_CENTER,
    payload: {
      center
    }
  } as SetCenterAction);

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
  ALL = 'ALL',
  RURAL = 'RURAL',
  SUBURBAN = 'SUBURBAN',
  URBAN = 'URBAN'
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
