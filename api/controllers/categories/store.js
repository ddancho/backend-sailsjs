module.exports = {
  friendlyName: 'Store',

  description: 'Store category.',

  inputs: {
    title: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    isActive: {
      type: 'boolean',
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
      const category = {
        title: inputs.title,
      };
      if (inputs.isActive) {
        category.isActive = inputs.isActive;
      }

      await Category.create(category);

      return exits.success({
        message: 'New category record successfully created',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
