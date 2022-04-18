const isEmail = require('validator/lib/isEmail');

module.exports = async function (req, res, proceed) {
  if (!req.body.password || !req.body.passwordConfirmation) {
    return res.status(400).json({
      message: 'User registration failed',
      error:
        'Missing ' +
        (!req.body.password ? 'password ' : '') +
        (!req.body.password && !req.body.passwordConfirmation ? 'and ' : '') +
        (!req.body.passwordConfirmation ? 'passwordConfirmation ' : '') +
        'input(s)',
    });
  }

  if (req.body.password !== req.body.passwordConfirmation) {
    return res.status(400).json({
      message: 'User registration failed',
      error: 'Password and password confirmation values mismatch',
    });
  }

  if (req.body.email) {
    if (!isEmail(req.body.email)) {
      return res.status(400).json({
        message: 'User registration failed',
        error: `${req.body.email} is not a valid email address`,
      });
    }

    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      return res.status(400).json({
        message: 'User registration failed',
        error: `Email address is already registered`,
      });
    }
  }

  return proceed();
};
