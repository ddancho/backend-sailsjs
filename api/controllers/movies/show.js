module.exports = {
  friendlyName: 'Show',

  description: 'Show movie.',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Fetching requested movie with categories',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    return exits.success({
      message: 'Movie with categories',
      data: this.req.movie,
    });
  },
};
