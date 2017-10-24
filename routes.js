const routes = require('next-routes')();

// the next-routes package is used in order to achieve dynamic routes
// (in case that becomes required).
//
// Route configuration works similarly like in express, for eg:
//    .add('product-lander', '/products/:productSlug')
//


routes
  .add('lander', '/')
  .add('product-lander', '/products/:productSlug');

module.exports = routes;
