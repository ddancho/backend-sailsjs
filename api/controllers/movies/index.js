module.exports = {
  friendlyName: 'Index',

  description: 'Index movies.',

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
    try {
      const movies = await Movie.find().populate('categories');

      return exits.success({
        message: 'Movies with belonging categories',
        data: movies,
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
