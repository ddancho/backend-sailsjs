module.exports = {
  friendlyName: 'Sign in user',

  description: `
  header : Authorization : Bearer token 
  result : return user info if token is valid,
           if expired 401        
  `,

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'User info',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    // ? customToJSON \../
    const user = _.omit(this.req.authUser, ['password']);

    return exits.success({
      message: 'User info',
      data: user,
    });
  },
};
