module.exports = {
  friendlyName: 'Register',

  description: 'Register user.',

  inputs: {
    username: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'New record created',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      await User.register(inputs);

      return exits.success({
        message: 'New user record successfully created',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
