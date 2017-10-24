// WIP ":D"
// TODO!!

import logger from 'loglevel';

let initialized = false;


function initializeLogging() {
  // if (window.INSTAGAME.environment !== 'production') {
  //   logger.disableAll();
  // } else {
  logger.setLevel('trace');
  // }

  initialized = true;
}


export default function getLogger(name) {
  if (!initialized) {
    initializeLogging();
  }

  return name ? logger.getLogger(name) : logger;
}
