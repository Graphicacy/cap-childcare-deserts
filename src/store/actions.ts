import { StateName } from '../data';
import { TooltipShowState } from './state';

export enum ActionType {
  SELECT_STATE = 'SELECT_STATE',
  SET_ZOOM = 'SET_ZOOM',
  SET_CENTER = 'SET_CENTER',
  SHOW_TOOLTIP = 'SHOW_TOOLTIP',
  HIDE_TOOLTIP = 'HIDE_TOOLTIP'
}

export type Action =
  | SelectState
  | SetZoomLevel
  | SetCenter
  | ShowTooltipAction
  | HideTooltipAction;

export type Dispatch = (action: Action) => void;

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
  payload: TooltipShowState;
};

export const showTooltip = (payload: TooltipShowState) =>
  ({
    type: ActionType.SHOW_TOOLTIP,
    payload
  } as ShowTooltipAction);

type HideTooltipAction = {
  type: ActionType.HIDE_TOOLTIP;
};

export const hideTooltip = () =>
  ({ type: ActionType.HIDE_TOOLTIP } as HideTooltipAction);
