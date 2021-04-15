const compose = require('koa-compose');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const zlib = require('zlib');

// handle errors tossed by routes...
function handleRouterErrors() {
  return async function handleErrors(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { status: 'error', message: err.message };
      ctx.app.emit('error', err, ctx);
    }
  };
}

// a little compression
const compressConfig = {
  threshold: 2048,
  gzip: { flush: zlib.constants.Z_SYNC_FLUSH },
  deflate: { flush: zlib.constants.Z_SYNC_FLUSH },
  br: false,
};

// package up the middleware
module.exports = compose([
  handleRouterErrors(),
  compress(compressConfig),
  helmet(),
  koaBody(),
  logger(),
]);
