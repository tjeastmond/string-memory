const Koa = require('koa');
const Router = require('@koa/router');
const middleware = require('./middleware');
const store = require('./store');

// init
const app = new Koa();
const router = new Router();

// attach simple data store
app.context.store = store();

// setup middleware
app.use(middleware);
app.use(router.routes());
app.use(router.allowedMethods());

// connect routes
require('./routes/routes')(router);

module.exports = function startServer(port = 9000) {
  return app.listen(port, () => {
    console.log(`[Running] Server running on port ${port}...`);
  });
};
