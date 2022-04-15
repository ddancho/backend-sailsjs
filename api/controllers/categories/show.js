module.exports = {
  friendlyName: 'Show',

  description: 'Show categories.',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Fetching requested category populated with movies',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    return exits.success({
      message: 'Category with movies',
      data: this.req.category,
    });
  },
};
