module.exports = {
  friendlyName: 'New access tokens',

  description: `
  header : Authorization : Bearer token 
  body   : refreshToken
  result : create new access tokens
  `,

  inputs: {
    refreshToken: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'New access tokens created',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      let accessTokens = null;

      await sails.getDatastore().transaction(async (db) => {
        const refreshToken = inputs.refreshToken;

        await Token.destroyOne({
          where: {
            token: refreshToken,
          },
        }).usingConnection(db);

        const user = this.req.authUser;

        accessTokens = await sails.helpers.generateJwtToken(
          user.username,
          user.email
        );

        await Token.create({
          token: accessTokens.refreshToken,
          user: user.id,
        }).usingConnection(db);
      });

      return exits.success({
        message: 'New access tokens successfully created',
        accessTokens,
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
