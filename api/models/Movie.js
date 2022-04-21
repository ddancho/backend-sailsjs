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
    slug: {
      type: 'string',
    },
    movieLength: {
      type: 'number',
      required: true,
      isInteger: true,
      min: 1,
      max: 600,
      columnName: 'movie_length',
      columnType: 'integer unsigned',
    },
    movieDetails: {
      type: 'json',
      defaultsTo: '{}',
      columnName: 'movie_details',
    },

    categories: {
      collection: 'category',
      via: 'movies',
    },
  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

  beforeCreate: async function (values, proceed) {
    // create slug
    const slug = await sails.helpers.createSlug(values.title);

    values.slug = slug;

    return proceed();
  },

  filter: async function ({ comparison, duration, page, pageSize }) {
    const direction = 'movieLength' + (comparison === '>' ? ' DESC' : ' ASC');
    const skip = (page - 1) * pageSize;

    const totalRecords = Movie.count({
      where: { movieLength: { [comparison]: duration } },
    });

    const records = Movie.find({
      where: { movieLength: { [comparison]: duration } },
      sort: [direction],
      skip: skip,
      limit: pageSize,
    }).populate('categories');

    try {
      const data = await Promise.all([totalRecords, records]);

      return {
        totalRecords: data[0],
        totalPages: Math.ceil(data[0] / pageSize),
        pageSize: Number(pageSize),
        records: data[1],
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
