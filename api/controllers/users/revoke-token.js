module.exports = {
  friendlyName: 'Revoke refresh token',

  description: `
  header : Authorization : Bearer token 
  body   : refreshToken
  result : is_revoked set to true (1)
  `,

  inputs: {
    refreshToken: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Refresh token revoked',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const refreshToken = inputs.refreshToken;

      await Token.updateOne({
        where: {
          token: refreshToken,
        },
      }).set({
        isRevoked: true,
      });

      return exits.success({
        message: 'Refresh token successfully revoked',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
