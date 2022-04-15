module.exports = {
  friendlyName: 'Delete',

  description: 'Delete categories.',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Delete requested category with related movies',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      await sails.getDatastore().transaction(async (db) => {
        const categoryId = this.req.category.id;
        const ids = _.map(this.req.category.movies, 'id');

        await Category.destroyOne({
          id: categoryId,
        }).usingConnection(db);

        await Category.removeFromCollection(
          categoryId,
          'movies',
          ids
        ).usingConnection(db);
      });

      return exits.success({
        message: 'Category successfully deleted',
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
