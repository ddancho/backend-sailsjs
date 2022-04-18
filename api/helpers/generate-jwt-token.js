const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Generates new jwt token',

  description: '',

  inputs: {
    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Jwt token created',
    },
  },

  fn: async function ({ username, email }, exits) {
    try {
      const payload = {
        username,
        email,
        issuer: sails.config.jwtIssuer,
      };

      const token = jwt.sign(payload, sails.config.jwtTokenSecret, {
        expiresIn: sails.config.jwtExpiresIn,
      });

      const refreshToken = jwt.sign(
        payload,
        sails.config.jwtRefreshTokenSecret
      );

      return exits.success({ token, refreshToken });
    } catch (error) {
      throw new Error(error);
    }
  },
};
