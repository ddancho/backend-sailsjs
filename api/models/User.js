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

  customToJSON: function () {
    return _.omit(this, ['password']);
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

  login: async function ({ email, password }) {
    try {
      let user = null;
      let accessTokens = null;

      await sails.getDatastore().transaction(async (db) => {
        user = await User.findOne({
          where: { email },
        }).usingConnection(db);

        if (!user) {
          return;
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          user = null;
          return;
        }

        accessTokens = await sails.helpers.generateJwtToken(
          user.username,
          user.email
        );

        await Token.create({
          token: accessTokens.refreshToken,
          user: user.id,
        }).usingConnection(db);
      });

      return {
        user,
        accessTokens,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
