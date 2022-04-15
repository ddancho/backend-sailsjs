module.exports = {
  friendlyName: 'Store',

  description: 'Store movie.',

  inputs: {
    title: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    description: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    author: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    rating: {
      type: 'number',
      required: true,
      isInteger: true,
      min: 0,
      max: 10,
    },
    movieLength: {
      type: 'number',
      required: true,
      isInteger: true,
      min: 1,
      max: 600,
    },
    categories: {
      type: 'json',
      required: true,
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
      await sails.getDatastore().transaction(async (db) => {
        const movie = await Movie.create({
          title: inputs.title,
          description: inputs.description,
          author: inputs.author,
          rating: inputs.rating,
          movieLength: inputs.movieLength,
        })
          .fetch()
          .usingConnection(db);

        const ids = _.map(inputs.categories, 'id');

        await Movie.addToCollection(
          movie.id,
          'categories',
          ids
        ).usingConnection(db);
      });

      return exits.success({
        message: 'New movie record successfully created',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
