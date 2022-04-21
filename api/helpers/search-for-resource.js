const axios = require('axios');

module.exports = {
  friendlyName: 'Search for resource.',

  description: 'search for movie details on the external resource',

  inputs: {
    params: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Requested resource',
    },
  },

  fn: async function ({ params }, exits) {
    // this should go in config/local.js
    // but for clarity it's here
    config = {
      /*
    // RapidAPI Hub
    // https://rapidapi.com/hub
    */
      imdb: {
        method: 'GET',
        url: 'https://imdb-data-searching.p.rapidapi.com/om',
        headers: {
          'X-RapidAPI-Host': 'imdb-data-searching.p.rapidapi.com',
          'X-RapidAPI-Key': sails.config.rapidApiKey,
        },
      },
      /*
    // testing
    // JSONPlaceholder
    // https://jsonplaceholder.typicode.com/
    */
      users: {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
      },
    };

    config.imdb.params = params;
    const options = config.imdb;

    try {
      const response = await axios(options);
      return exits.success(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  },
};
