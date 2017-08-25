import { Dispatch, Middleware } from 'redux';
import { ThunkAction } from 'redux-thunk';
import URLSearchParams = require('url-search-params');
import { stateData, stateList, StateName } from '../data';
import { Action, ActionType, State, UrbanicityFilter } from './';

const stateByAbbr: { [K: string]: StateName | void } = {};
stateList.forEach(state => {
  stateByAbbr[stateData[state].abbr] = state;
});

export function getParamsOnLoad() {
  const query = new URLSearchParams(window.location.search);
  const state = stateByAbbr[query.get('state')];

  return {
    state,
    urbanicity: query.get('urbanicity') as UrbanicityFilter | null,
    embed: query.get('embed')
  };
}

/**
 * redux middleware to sync props with query string
 *
 * @param api redux middleware api
 */
export const syncQueryString: Middleware = <S>() => (next: Dispatch<S>) => (
  action: Action | ThunkAction<any, S, any>
) => {
  if (typeof action === 'function') return next(action);
  const query = new URLSearchParams(window.location.search);
  const baseUrl = [
    location.protocol,
    '//',
    location.host,
    location.pathname
  ].join('');

  switch (action.type) {
    case ActionType.SELECT_STATE: {
      if (action.payload.name === 'All states') {
        query.delete('urbanicity');
        query.delete('state');
      } else {
        query.set('state', stateData[action.payload.name].abbr);
      }
      break;
    }

    case ActionType.SET_URBAN_FILTER: {
      query.set('urbanicity', action.payload);
      break;
    }
  }
  const queryString = query.toString();
  history.replaceState(
    {},
    '',
    baseUrl + (queryString ? '?' + queryString : '')
  );
  next(action);
};
