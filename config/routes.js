/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /api/v1/movies': { action: 'movies/index' },
  'GET /api/v1/movies/:id': { action: 'movies/show' },

  'DELETE /api/v1/movies/:id': { action: 'movies/delete' },
  'PATCH /api/v1/movies/:id': { action: 'movies/update' },

  'POST /api/v1/movies/store': { action: 'movies/store' },
  'POST /api/v1/categories/store': { action: 'categories/store' },
};
