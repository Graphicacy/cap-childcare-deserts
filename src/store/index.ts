import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  Action,
  ActionType,
  Dispatch,
  selectStateAndCenter,
  setScreenSize
} from './actions';
import { mobileStartZoom, startZoom } from './constants';
import queryString from './query-string';
import { default as reducer } from './reducers';
import { State } from './state';

export * from './state';
export * from './actions';
export * from './reducers';

const middleware = [thunk];

export function initStore() {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const query = queryString();
  const store = createStore(
    reducer,
    {
      embed: query.embed
    },
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

  return store;
}
