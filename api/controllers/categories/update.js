module.exports = {
  friendlyName: 'Update',

  description: 'Update category.',

  inputs: {
    title: {
      type: 'string',
      minLength: 3,
    },
    isActive: {
      type: 'boolean',
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Category record updated',
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

      const categoryId = this.req.category.id;
      const { ...data } = inputs;

      await Category.updateOne({ id: categoryId }).set(data);

      return exits.success({
        message: 'Category record successfully updated',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
