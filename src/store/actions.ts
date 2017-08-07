import { StateName, stateData } from '../data';
import { ToolTipData } from './state';
import { startZoom, startCenter } from './constants';

export enum ActionType {
  SELECT_STATE = 'SELECT_STATE',
  SET_ZOOM = 'SET_ZOOM',
  SET_CENTER = 'SET_CENTER',
  SHOW_TOOLTIP = 'SHOW_TOOLTIP',
  HIDE_TOOLTIP = 'HIDE_TOOLTIP',
  MOUSE_MOVE = 'MOUSE_MOVE',
  SHOW_LEGEND = 'SHOW_LEGEND',
  HIDE_LEGEND = 'HIDE_LEGEND'
}

export type Action =
  | SelectState
  | SetZoomLevel
  | SetCenter
  | ShowTooltipAction
  | HideTooltipAction
  | MouseMoveAction
  | ShowLegendAction
  | HideLegendAction;

export type Dispatch = (action: Action | Dispatch) => void;

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

type SelectState = {
  type: ActionType.SELECT_STATE;
  payload: { name: StateName };
};

const stateZoom = [5.5] as [number];
export const zoomToState = (name: StateName) => (dispatch: Dispatch) => {
  if (name !== 'All states') {
    dispatch(setCenter(stateData[name].center as [number, number]));
    dispatch(setZoomLevel(stateZoom));
  } else {
    dispatch(setCenter(startCenter as [number, number]));
    dispatch(setZoomLevel(startZoom as [number]));
  }
};

export const setSelectedState = (name: StateName) => (dispatch: Dispatch) => {
  dispatch(zoomToState(name));
  dispatch(
    {
      type: ActionType.SELECT_STATE,
      payload: {
        name
      }
    } as SelectState
  );
};

type SetZoomLevel = {
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
  } as SetZoomLevel);

type SetCenter = {
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
  } as SetCenter);

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
