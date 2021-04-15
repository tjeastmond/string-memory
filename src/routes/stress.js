/**
 * Endpoint for me to use for stress testing
 */

module.exports = async function stress(ctx) {
  const str = `Bob's Burgers`;
  await ctx.store.insertOrUpdate(str);
  await ctx.store.get(str);
  ctx.body = { status: 'ok' };
};
