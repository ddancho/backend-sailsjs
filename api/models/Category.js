/**
 * Category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'categories',

  attributes: {
    title: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    isActive: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'is_active',
    },

    movies: {
      collection: 'movie',
      via: 'categories',
    },
  },
};
