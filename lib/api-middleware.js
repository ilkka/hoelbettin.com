// api-middleware
//    intercepts actions which has [CALL_API] attribute, and does the requested API call
//
// Based on https://github.com/reactjs/redux/blob/master/examples/real-world/middleware/api.js
/* eslint-disable import/first */
require('es6-promise').polyfill();

import 'isomorphic-fetch';
import _ from 'lodash';
import queryString from 'query-string';

import { CALL_API, getApiActionTypes } from './constants/requests';
import getLogger from './logger';


const API_URL = 'http://localhost:9000' || window.location.origin; // TODO zzzz

const log = getLogger(__filename);

const injectTokens = opts => ({
  ...opts,
  headers: {
    ...opts.headers
  }
});

const generateRequestId = () => Date.now().toString() + Math.floor(Math.random() * 1000);

// function for doing the actual API-call
const doApiCall = (fullUrl, opts = {}) => fetch(fullUrl, injectTokens(opts))
  .then(response => response.json()
    .then(content => ({ content, response }))
    .catch((error) => {
      log.error('Error catched on JSON conversion, fallbacking to null', error);
      return { content: null, response };
    })
  ).then(({ content, response }) => {
    if (response.status >= 200 && response.status < 300) {
      return { content, response };
    }

    return Promise.reject({ content, response });
  });


export default () => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    hostname,
    method = 'GET',
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    query = {}
  } = callAPI;

  let { endpoint, body } = callAPI;

  // Check & process endpoint
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint must be given');
  } else if (!_.isEmpty(query)) {
    endpoint += `?${queryString.stringify(query)}`;
  }

  if (body) {
    body = JSON.stringify(body); // isomorphic-fetch eats only stringified JSON
  }


  // Sanitycheck that endpoint doesn't start with "/"
  // -> otherwise things will explode (request will go to foo.com//api)
  if (endpoint.charAt(0) === '/') {
    endpoint = endpoint.substr(1);
  }

  if (typeof action.type !== 'string') {
    throw new Error('No action.type string given!');
  }

  const requestId = generateRequestId();
  const apiActions = getApiActionTypes(action.type);

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  // Trigger the "_REQUEST" -action
  next(actionWith({ requestId, type: apiActions.request }));

  // Do the actual call
  return doApiCall(`${hostname || API_URL}/${endpoint}`, { method, body, headers })
  // ...and trigger "_SUCCESS" or "_FAILURE"-action based on the result of API-call
  .then(({ content, response }) =>
    next(actionWith({
      requestId,
      type: apiActions.success,
      responseStatus: response.status,
      headers: response.headers,
      response: content
    }))
  , ({ content, response }) => {
    if (response) {
      if (response.status !== 401) {
        // TODO report error somehow!
        throw new Error('API-call failed!');
      }
    }

    next(actionWith({
      requestId,
      response,
      type: apiActions.failure,
      error: 'Something exploded!' // TODO: does API tell somehow what went wrong? if so, check that!
    }));

    return Promise.reject({ response, content });
  });
};
