const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({
      message: 'Missing authentication credentials',
    });
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, sails.config.jwtTokenSecret, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid authentication credentials',
      });
    }
    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid authentication credentials',
      });
    }
  });

  return proceed();
};
