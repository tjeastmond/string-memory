/**
 * Endpoint for me to use for stress testing
 */

module.exports = async function stress(ctx) {
  const str1 = `Bob's Burgers`;
  const key1 = await ctx.store.insertOrUpdate(str1);
  const get1 = await ctx.store.get(key1);
  const str2 = `Sticking feathers up your butt does not make you a chicken.`;
  const key2 = await ctx.store.insertOrUpdate(str2);
  const get2 = await ctx.store.get(key2);
  ctx.body = { keys: [get1, get2] };
};
