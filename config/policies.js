/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  'movies/store': 'sanitize-body',
  'movies/show': ['sanitize-params', 'find-movie'],
  'movies/delete': ['sanitize-params', 'find-movie'],
  'movies/update': ['sanitize-body', 'sanitize-params', 'find-movie'],
  'movies/filter': 'filter-movies',
  'categories/store': 'sanitize-body',
  'categories/show': ['sanitize-params', 'find-category'],
  'categories/delete': ['sanitize-params', 'find-category'],
  'categories/update': ['sanitize-body', 'sanitize-params', 'find-category'],
  'users/register': ['sanitize-body', 'check-user-registration'],
  'users/login': 'sanitize-body',
  'users/logout': ['sanitize-body', 'is-authenticated'],
  'users/new-access-tokens': ['sanitize-body', 'is-authenticated'],
  'users/sign-in-user': 'is-authenticated',
  'users/revoke-token': ['sanitize-body', 'is-authenticated'],
};
