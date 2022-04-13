const trim = require('validator/lib/trim');
const escape = require('validator/lib/escape');

module.exports = async function (req, res, proceed) {
  if (req.body) {
    const properties = Object.getOwnPropertyNames(req.body);

    _.each(properties, (property) => {
      if (typeof req.body[property] === 'string') {
        req.body[property] = trim(escape(req.body[property]));
      }
    });

    if (req.body.categories && !_.isEmpty(req.body.categories)) {
      _.each(req.body.categories, (category) => {
        if (category.title && typeof category.title === 'string') {
          category.title = trim(escape(category.title));
        }
      });
    }
  }

  return proceed();
};
