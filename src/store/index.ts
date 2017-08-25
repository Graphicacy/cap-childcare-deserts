import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  Action,
  ActionType,
  Dispatch,
  selectStateAndCenter,
  setScreenSize,
  UrbanicityFilter
} from './actions';
import { mobileStartZoom, startZoom } from './constants';
import { getParamsOnLoad, syncQueryString } from './query-string';
import { default as reducer } from './reducers';
import { State } from './state';

export * from './state';
export * from './actions';
export * from './reducers';

const middleware = [thunk, syncQueryString];

export function initStore() {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const query = getParamsOnLoad();
  const store = createStore<State>(
    reducer,
    {
      embed: query.embed === 'true',
      urbanicityFilter: query.urbanicity || UrbanicityFilter.ALL
    } as any,
    composeEnhancers(applyMiddleware(...middleware))
  );

  let resizeTimeout: any;
  window.addEventListener('resize', () => {
    // debounce
    clearInterval(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const size = window.innerWidth;
      const mobile = size <= 768;
      const {
        selectedState,
        mobile: previouslyMobile
      } = store.getState() as State;
      store.dispatch(setScreenSize(mobile));
      store.dispatch(selectStateAndCenter(selectedState));
    }, 500);
  });

  /**
   * select query string state on load
   */
  const queryState = query.state;
  if (queryState && queryState !== 'All states') {
    const destroy = store.subscribe(() => {
      const state = store.getState();
      if (state.mapReady) {
        destroy();
        store.dispatch(selectStateAndCenter(queryState));
      }
    });
  }

  return store;
}
