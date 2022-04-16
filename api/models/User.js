/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',

  attributes: {
    username: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },

    tokens: {
      collection: 'token',
      via: 'user',
    },
  },
};
