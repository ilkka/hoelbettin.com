// The "magic attribute" which API-middleware listens to
export const CALL_API = 'CALL_API';

export const REQUEST_SUFFIX = '_REQUEST';
export const SUCCESS_SUFFIX = '_SUCCESS';
export const FAILURE_SUFFIX = '_FAILURE';

export const getApiActionTypes = actionName => ({
  request: `${actionName}${REQUEST_SUFFIX}`,
  success: `${actionName}${SUCCESS_SUFFIX}`,
  failure: `${actionName}${FAILURE_SUFFIX}`
});
