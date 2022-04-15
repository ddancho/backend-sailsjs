const trim = require('validator/lib/trim');
const escape = require('validator/lib/escape');

module.exports = async function (req, res, proceed) {
  if (req.query) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PAGE_SIZE = 3;

    let {
      comparison = null,
      duration = null,
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
    } = req.query;

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

    if (Number.isNaN(Number(page))) {
      return res.status(400).json({
        message: 'Incorrect page parameter, accepts only unsigned integers',
      });
    }

    if (Number.isNaN(Number(pageSize))) {
      return res.status(400).json({
        message: 'Incorrect pageSize parameter, accepts only unsigned integers',
      });
    }

    req.filter = {
      comparison: comparison === 'greater' ? '>' : '<',
      duration,
      page,
      pageSize,
    };
  }

  return proceed();
};
