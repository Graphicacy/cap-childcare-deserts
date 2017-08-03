import { StateName } from '../data';

export enum ActionType {
  SELECT_STATE = 'SELECT_STATE',
  SET_ZOOM = 'SET_ZOOM',
  SET_CENTER = 'SET_CENTER'
}

export type Action = SelectState | SetZoomLevel | SetCenter;
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
