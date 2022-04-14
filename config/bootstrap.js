/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // seed categories table with default values for movie category
  // check if there are any records in the table
  if ((await Category.count()) > 0) {
    return;
  }

  // there is not, seed data
  // thriller, horror, drama, fantasy, comedy, action
  await Category.createEach([
    { title: 'thriller', slug: await sails.helpers.createSlug('thriller') },
    { title: 'horror', slug: await sails.helpers.createSlug('horror') },
    { title: 'drama', slug: await sails.helpers.createSlug('drama') },
    { title: 'fantasy', slug: await sails.helpers.createSlug('fantasy') },
    { title: 'comedy', slug: await sails.helpers.createSlug('comedy') },
    { title: 'action', slug: await sails.helpers.createSlug('action') },
  ]);
};
