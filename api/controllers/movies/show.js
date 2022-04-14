module.exports = {
  friendlyName: 'Show',

  description: 'Show movies.',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Fetching all movies with their categories',
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
