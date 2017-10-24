// from https://github.com/fridays/next-routes
// ..and https://github.com/zeit/next.js/blob/master/examples/root-static-files/server.js
//

const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');
const next = require('next');

const routes = require('./routes');


const SERVER_PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';


const app = next({ dev });
const handler = routes.getRequestHandler(app);

const getFullPathToStatic = pathname => join(__dirname, 'static', pathname);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    switch (parsedUrl.pathname) {
      case '/favicon.ico':
        // TODO: add favicon
        app.serveStatic(req, res, getFullPathToStatic(parsedUrl.pathname));
        break;

      default:
        handler(req, res, parsedUrl);
    }
  })
  .listen(SERVER_PORT, (err) => {
    if (err) throw err;

    console.log(`> Ready on http://localhost:${SERVER_PORT}`);
  });
});
