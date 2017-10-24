// ...applied from https://github.com/kirill-konshin/next-redux-wrapper

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { fromJS } from 'immutable';
import { mapValues } from 'lodash/fp';

import apiMiddleware from './lib/api-middleware';

const reducers = {
  // here be dragons
};


export function asImmutableState(state) {
  return mapValues(fromJS)(state);
}

// from https://github.com/zeit/next.js/issues/698
// eslint-disable-next-line
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initStore = (initialState = {}) => {
  const store = createStore(
    // TODO: check that there needs to be specific checks for Immutablejs thingies
    // (example: https://github.com/kirill-konshin/next-redux-wrapper)
    combineReducers(reducers),
    asImmutableState(initialState),
    composeEnhancers(applyMiddleware(apiMiddleware)) // add thunk later on when there is a need?
  );

  return store;
};

