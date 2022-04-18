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
  'GET /api/v1/movies/filter': { action: 'movies/filter' },
  'POST /api/v1/movies/store': { action: 'movies/store' },
  'PATCH /api/v1/movies/:id': { action: 'movies/update' },
  'DELETE /api/v1/movies/:id': { action: 'movies/delete' },

  'GET /api/v1/categories': { action: 'categories/index' },
  'GET /api/v1/categories/:id': { action: 'categories/show' },
  'POST /api/v1/categories/store': { action: 'categories/store' },
  'PATCH /api/v1/categories/:id': { action: 'categories/update' },
  'DELETE /api/v1/categories/:id': { action: 'categories/delete' },

  'POST /api/v1/users/register': { action: 'users/register' },
  'POST /api/v1/users/login': { action: 'users/login' },
};
