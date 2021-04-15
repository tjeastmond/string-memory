const { isString } = require('../utils');

/**
 * Endpoint route that excepts a string body. If it
 * receives anything other than a string in the body,
 * an error will be thrown and a 500 returned.
 */

module.exports = async function input(ctx) {
  const body = ctx.request?.body;

  if (!isString(body)) {
    ctx.throw(400, 'The request body MUST be a string');
  }

  const res = await ctx.store.insertOrUpdate(body);
  ctx.body = res;
};
