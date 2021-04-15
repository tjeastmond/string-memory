// Simply returns the entire DB as a JSON object.
module.exports = async function all(ctx) {
  ctx.body = await ctx.store.getAll();
};
