module.exports = async function (req, res, proceed) {
  if (req.movieId) {
    const id = req.movieId;
    let movie = null;

    if (id.match(/^[0-9]+$/) !== null) {
      // string contains only numbers so it must be a id
      // find movie by id
      movie = await Movie.findOne({
        where: { id },
      }).populate('categories');
    } else {
      // find movie by slug
      movie = await Movie.findOne({
        where: { slug: id },
      }).populate('categories');
    }

    if (!movie) {
      return res.status(400).json({
        message: `Failed to find a movie with the identifier ${id}`,
      });
    }

    req.movie = movie;
  }

  return proceed();
};
