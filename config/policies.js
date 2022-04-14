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
  'categories/store': 'sanitize-body',
};
