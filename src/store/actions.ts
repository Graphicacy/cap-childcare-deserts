import { StateName } from '../data';
import { ToolTipData } from './state';

export enum ActionType {
  SELECT_STATE = 'SELECT_STATE',
  SET_ZOOM = 'SET_ZOOM',
  SET_CENTER = 'SET_CENTER',
  SHOW_TOOLTIP = 'SHOW_TOOLTIP',
  HIDE_TOOLTIP = 'HIDE_TOOLTIP',
  MOUSE_MOVE = 'MOUSE_MOVE'
}

export type Action =
  | SelectState
  | SetZoomLevel
  | SetCenter
  | ShowTooltipAction
  | HideTooltipAction
  | MouseMoveAction;

export type Dispatch = (action: Action) => void;

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

export const setSelectedState = (name: StateName) =>
  ({
    type: ActionType.SELECT_STATE,
    payload: {
      name
    }
  } as SelectState);

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
