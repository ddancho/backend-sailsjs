const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  friendlyName: 'Create unique slug',

  description: '',

  inputs: {
    title: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Unique slug created',
    },
  },

  fn: async function (inputs, exits) {
    const slug = inputs.title + '-' + uuidv4();

    return exits.success(
      slugify(slug, {
        lower: true,
        strict: true,
      })
    );
  },
};
