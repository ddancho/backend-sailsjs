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
  }

  return proceed();
};
