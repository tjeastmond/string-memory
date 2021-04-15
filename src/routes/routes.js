module.exports = function (router) {
  router.get('/', require('./home'));
  router.get('/all', require('./all'));
  router.get('/query', require('./query'));
  router.get('/stress', require('./stress'));
  router.post('/input', require('./input'));
};
