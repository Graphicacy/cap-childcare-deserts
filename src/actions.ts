import { StateName } from './states';

export enum ActionType {
  SELECT_STATE = 'SELECT_STATE'
}

export type Action = SelectState;

type SelectState = ActionObject<ActionType.SELECT_STATE, { name: StateName }>;

type ActionObject<T extends ActionType, P> = {
  type: T;
  payload: P;
};

export const setSelectedState = (name?: StateName) => ({
  type: ActionType.SELECT_STATE,
  payload: {
    name
  }
});
