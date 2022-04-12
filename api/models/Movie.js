/**
 * Movie.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'movies',

  attributes: {
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
      columnType: 'integer unsigned',
    },

    categories: {
      collection: 'category',
      via: 'movies',
    },
  },
};
