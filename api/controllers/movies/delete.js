module.exports = {
  friendlyName: 'Delete',

  description: 'Delete movie.',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Delete requested movie with categories',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      await sails.getDatastore().transaction(async (db) => {
        const movieId = this.req.movie.id;
        const ids = _.map(this.req.movie.categories, 'id');

        await Movie.destroyOne({
          id: movieId,
        }).usingConnection(db);

        await Movie.removeFromCollection(
          movieId,
          'categories',
          ids
        ).usingConnection(db);
      });

      return exits.success({
        message: 'Movie successfully deleted',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
