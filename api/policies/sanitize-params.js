const trim = require('validator/lib/trim');
const escape = require('validator/lib/escape');

module.exports = async function (req, res, proceed) {
  if (req.params) {
    const properties = Object.getOwnPropertyNames(req.params);

    _.each(properties, (property) => {
      if (typeof req.params[property] === 'string') {
        req.params[property] = trim(escape(req.params[property]));
      }
    });

    if (req.params.id) {
      req.movieId = req.params.id;
    }
  }

  return proceed();
};
