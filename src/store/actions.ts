import { StateName } from '../data';

export enum ActionType {
  SELECT_STATE = 'SELECT_STATE'
}

export type Action = SelectState;

type SelectState = {
  type: ActionType.SELECT_STATE;
  payload: { name: StateName };
};

export const setSelectedState = (name?: StateName) => ({
  type: ActionType.SELECT_STATE,
  payload: {
    name
  }
});
