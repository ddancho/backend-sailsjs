module.exports = async function (req, res, proceed) {
  if (req.findId) {
    const id = req.findId;
    let category = null;

    if (id.match(/^[0-9]+$/) !== null) {
      // string contains only numbers so it must be a id
      // find category by id
      category = await Category.findOne({
        where: { id },
      }).populate('movies');
    } else {
      // find category by slug
      category = await Category.findOne({
        where: { slug: id },
      }).populate('movies');
    }

    if (!category) {
      return res.status(400).json({
        message: `Failed to find a category with the identifier ${id}`,
      });
    }

    req.category = category;
  }

  return proceed();
};
