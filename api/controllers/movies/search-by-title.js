module.exports = {
  friendlyName: 'Search for movie by title',

  description: `
  search for the movie, controller redirects search to the external rest api service
  params : title of the movie
  returns : movie details
  title, year, rated, released, runtime, genre, director, writer, actors, plot,
  language, country, awards, metascore, imdbRating, imdbVotes, type
  `,

  inputs: {
    title: {
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
    const title = inputs.title;
    const params = { t: title };

    try {
      const resource = await sails.helpers.searchForResource(params);

      return exits.success({
        message: `Movie details for ${title}`,
        data: resource,
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error,
      });
    }
  },
};
