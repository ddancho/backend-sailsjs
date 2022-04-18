module.exports = {
  friendlyName: 'Login',

  description: 'Login user.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'User login',
    },
    notFound: {
      statusCode: 404,
      description: 'User not found',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const user = await User.login(inputs);

      if (!user) {
        return exits.notFound({
          error: 'User not found',
        });
      }

      return exits.success({
        message: 'User successfully logged in',
        data: user,
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
