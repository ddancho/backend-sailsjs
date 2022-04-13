module.exports = {
  sync: true,

  friendlyName: 'Is categories valid',

  description:
    'checks if categories inputs are valid, has to have title property and it is not empty string',

  inputs: {
    categories: {
      type: 'json',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'categories are valid or invalid',
    },
  },

  fn: function ({ categories }, exits) {
    let result = false;

    if (_.isEmpty(categories)) {
      return exits.success(false);
    }

    _.each(categories, (category) => {
      if (_.isEmpty(category) || !category.title) {
        // validation fails, break out
        result = false;
        return false;
      }

      result = _.isString(category.title) && !_.isEmpty(category.title);

      if (!result) {
        // validation fails, break out
        return false;
      }
    });

    return exits.success(result);
  },
};
