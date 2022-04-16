/**
 * Token.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tokens',

  attributes: {
    token: {
      type: 'string',
      required: true,
      unique: true,
    },
    isRevoked: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'is_revoked',
    },

    user: {
      model: 'user',
    },
  },
};
