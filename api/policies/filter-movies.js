const trim = require('validator/lib/trim');
const escape = require('validator/lib/escape');

module.exports = async function (req, res, proceed) {
  if (req.query) {
    let { comparison = null, duration = null } = req.query;

    if (!comparison || !duration) {
      return res.status(400).json({
        message: 'Failed to filter movie list',
        error:
          'Missing ' +
          (!comparison ? 'comparison ' : '') +
          (!comparison && !duration ? 'and ' : '') +
          (!duration ? 'duration ' : '') +
          'query string parameter(s)',
      });
    }

    comparison = trim(escape(String(comparison).toLowerCase()));
    duration = trim(escape(String(duration).toLowerCase()));

    if (comparison !== 'greater' && comparison !== 'less') {
      return res.status(400).json({
        message: 'Incorrect comparison parameter, accepts only greater, less',
      });
    }

    if (Number.isNaN(Number(duration))) {
      return res.status(400).json({
        message: 'Incorrect duration parameter, accepts only unsigned integers',
      });
    }

    if (duration < 1 || duration > 600) {
      return res.status(400).json({
        message: 'Incorrect duration value, accepts values in range [1, 600]',
      });
    }

    req.filter = {
      comparison: comparison === 'greater' ? '>' : '<',
      duration,
    };
  }

  return proceed();
};
