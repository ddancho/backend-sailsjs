module.exports = {
  friendlyName: 'Update',

  description: 'Update movie.',

  inputs: {
    title: {
      type: 'string',
      minLength: 3,
    },
    description: {
      type: 'string',
      minLength: 3,
    },
    author: {
      type: 'string',
      minLength: 3,
    },
    rating: {
      type: 'number',
      isInteger: true,
      min: 0,
      max: 10,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Movie record updated',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      if (Object.keys(inputs).length === 0) {
        return this.res.status(400).send({
          message: 'Nothing to update',
        });
      }

      const movieId = this.req.movie.id;
      const { ...data } = inputs;

      await Movie.updateOne({ id: movieId }).set(data);

      return exits.success({
        message: 'Movie record successfully updated',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
