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
    categories: {
      type: 'json',
      custom: function (value) {
        return sails.helpers.isCategoriesValid(value);
      },
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
      await Movie.create({
        title: inputs.title,
        description: inputs.description,
        author: inputs.author,
        rating: inputs.rating,
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
