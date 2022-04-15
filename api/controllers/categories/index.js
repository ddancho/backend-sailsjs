module.exports = {
  friendlyName: 'Index',

  description: 'Index categories.',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Fetching all categories populated with movies',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const categories = await Category.find().populate('movies');

      return exits.success({
        message: 'Categories with belonging movies',
        data: categories,
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
