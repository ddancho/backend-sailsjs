module.exports = {
  friendlyName: 'Filter',

  description: 'Filter movies by movie duration',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Requested movies',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const movies = await Movie.filter(this.req.filter);

      return exits.success({
        message: 'Filtered movies list',
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
