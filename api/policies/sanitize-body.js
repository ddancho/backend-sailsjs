const trim = require('validator/lib/trim');
const escape = require('validator/lib/escape');
const isJwt = require('validator/lib/isJWT');
const isJSON = require('validator/lib/isJSON');

module.exports = async function (req, res, proceed) {
  if (req.body) {
    const properties = Object.getOwnPropertyNames(req.body);

    _.each(properties, (property) => {
      if (typeof req.body[property] === 'string') {
        req.body[property] = trim(escape(req.body[property]));
      }
    });

    if (req.body.categories) {
      let categories = [];
      let arr = [];

      try {
        const ctgs = await Category.find({ select: ['title'] });
        arr = JSON.parse(JSON.stringify(ctgs));
        categories = _.map(arr, (category) => category.title);
      } catch (error) {
        return res.status(500).json({
          message: 'Something went wrong',
          error,
        });
      }

      let result = sails.helpers.isCategoriesValid(req.body.categories);

      if (!result) {
        return res.status(400).json({
          message: 'Categories validation fails',
          error:
            'Categories are empty or category object missing valid title property',
        });
      }

      _.each(req.body.categories, (category) => {
        category.title = trim(escape(category.title));
        if (!categories.includes(category.title)) {
          // break out
          result = false;
          return false;
        }
        // set category id
        category.id = _.find(arr, (item) => item.title === category.title).id;
      });

      if (!result) {
        return res.status(400).json({
          message: 'Category title validation fails',
          error: 'Category title is incorrect',
        });
      }
    }

    if (req.body.refreshToken) {
      if (!isJwt(req.body.refreshToken)) {
        return res.status(400).json({
          message: 'RefreshToken validation fails',
        });
      }
      const refreshToken = await Token.findOne({
        where: {
          token: req.body.refreshToken,
        },
      });

      if (!refreshToken) {
        return res.status(401).json({
          message: 'Invalid authentication credentials',
        });
      }
    }

    if (req.body.movieDetails) {
      if (!isJSON(req.body.movieDetails, { allow_primitives: true })) {
        return res.status(400).json({
          message: 'Movie details input validation fails',
        });
      }

      req.body.movieDetails = JSON.stringify(req.body.movieDetails);
    } else {
      req.body.movieDetails = '{}';
    }
  }

  return proceed();
};
