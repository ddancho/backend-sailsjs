module.exports = {
  friendlyName: 'Search for movies by keyword.',

  description: `
  search for the movie, controller redirects search to the external rest api service
  params : keyword for search
  returns : search : aray of the results, totalResults, response
  [{title,year,imdbID, type, poster}, ...]
  `,

  inputs: {
    keyword: {
      type: 'string',
      required: true,
      minLength: 2,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Requested movie details',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    const keyword = inputs.keyword;
    const params = { s: keyword };

    try {
      const resources = await sails.helpers.searchForResource(params);

      return exits.success({
        message: `Movies found for ${keyword}`,
        data: resources,
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
