const { isString } = require('../utils');

/**
 * Endpoint route handler that will return the number
 * of times the required `key` param as been "seen" by the
 * input endpoint. If the key is missing or not present, an
 * error will be thrown and a 500 returned.
 */

module.exports = async function query(ctx) {
  const key = ctx.request?.query?.key;

  if (!isString(key) || key.length === 0) {
    ctx.throw(400, `Param 'key' must be set to a string value`);
  }

  ctx.body = await ctx.store.get(key);
};
