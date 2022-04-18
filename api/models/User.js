/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

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

  register: async function ({ username, email, password }) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await User.create({
        username: username,
        email: email,
        password: hashPassword,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
