const movieSchema = require("../schema/movie.schema");
const getMoviesData = async (req, res, next) => {
  try {
    // if (!req.query.limit && req.query.skip) {
    //   next(error);
    //   return;
    // }
    const conf = [
      {
        ...(req.query.searchField && req.query.searchWord
          ? { [req.query.searchField]: req.query.searchWord }
          : {}),
      },
      [...(req.query.fields ? [...JSON.parse(req.query.fields)] : [])],
      ,
      {
        ...(req.query.skip ? { skip: req.query.skip } : {}),
        ...(req.query.limit ? { limit: req.query.limit } : {}),
      },
    ];
    //Conf = [{query}, [Elementos de busqueda(nombre del campo), {opciones de busqueda}]]
    // const conf = [
    //   {},
    //   ["title"],
    //   ,
    //   {
    //     skip: 0,
    //     limit: 2,
    //   },
    // ];
    const movies = await movieSchema.find(...conf);
    res.status(200).json({
      title: "Success",
      msg: "Movies Obtained",
      result: movies,
    });
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await movieSchema.find({ _id: req.params.id });
    res.status(200).json({
      title: "Success",
      msg: "Movie Obtained",
      result: movie,
    });
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const newMovie = movieSchema({
      year: req.body.year,
      director: req.body.director,
      description: req.body.description,
    });
    const movie = await newMovie.save();
    res.status(200).json({
      title: "Success",
      msg: "Movies Created",
      result: movie,
    });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const movie = await movieSchema.findByIdAndUpdate(
      req.params.id,
      {
        _id: req.params.id,
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      title: "Success",
      msg: "Movie Updated",
      result: movie,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await movieSchema.findOneAndDelete(req.params.id);
    res.status(200).json({
      title: "Success",
      msg: "Movie Deleted",
      result: movie,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMoviesData,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
