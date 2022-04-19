module.exports = {
  friendlyName: 'Logout',

  description: `
  header : Authorization : Bearer token 
  body   : refreshToken
  result : delete record in the db
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
      description: 'User logout',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const refreshToken = inputs.refreshToken;

      await Token.destroyOne({
        where: {
          token: refreshToken,
        },
      });

      return exits.success({
        message: 'User successfully logout',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
