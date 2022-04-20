const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({
      message: 'Missing authentication credentials',
    });
  }

  const token = req.headers.authorization.split(' ')[1];

  const verify = jwt.verify(
    token,
    sails.config.jwtTokenSecret,
    async (err, payload) => {
      if (err) {
        return { error: err };
      }
      const user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        return { error: 'User not found' };
      }

      return { user };
    }
  );

  const result = (await Promise.all([verify]))[0];

  if (result['error']) {
    return res.status(401).json({
      message: 'Invalid authentication credentials',
    });
  } else {
    const { ...authUser } = result['user'];
    req.authUser = authUser;
  }

  return proceed();
};
