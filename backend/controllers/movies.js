import expressAsyncHandler from "express-async-handler";
import Movies from "../models/movies.js";

// ********** PUBLIC **********
// @desc     Get all movies
// route     GET /api/movies/
// @access   Public
export const getMovies = expressAsyncHandler(async (req, res) => {
  const movies = await Movies.find().populate("genres");
  res.status(200).json(movies);
});

// @desc     Get one movie
// route     GET /api/movies/:id
// @access   Public
export const getMovie = expressAsyncHandler(async (req, res) => {
  const movie = await Movies.findById(req.params.id).populate("genres");
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.status(200).json(movie);
});

// @desc     Get new movies
// route     GET /api/movies/new
// @access   Public
export const getNewMovies = expressAsyncHandler(async (req, res) => {
  const movies = await Movies.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json(movies);
});

// @desc     Get top movies
// route     GET /api/movies/top
// @access   Public
export const getTopMovies = expressAsyncHandler(async (req, res) => {
  const movies = await Movies.find().sort({ numberOfReviews: -1 }).limit(10);
  res.status(200).json(movies);
});

// @desc     Get top movies
// route     GET /api/movies/top
// @access   Public
export const getRandomMovies = expressAsyncHandler(async (req, res) => {
  const movies = await Movies.aggregate([{ $sample: { size: 10 } }]);
  res.status(200).json(movies);
});

// @desc     Post review
// route     Post /api/movies/:id
// @access   Public
export const createReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const movie = await Movies.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  const alreadyReviewed = movie.reviews.find(
    (r) => r.userId.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Movie already reviewed");
  }

  const review = {
    userName: req.user.username,
    userId: req.user._id,
    userImage: req.user.image,
    comment,
    rating: Number(rating) || 0,
  };
  movie.reviews.push(review);
  movie.numberOfReviews = movie.reviews.length;
  movie.rating =
    movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
    movie.reviews.length;

  await movie.save();
  res.status(201).json({ message: "Review added" });
});

// ********** ADMIN **********
// @desc     Create a movie
// route     POST /api/movies/
// @access   Private/Admin
export const createMovie = expressAsyncHandler(async (req, res) => {
  const {
    name,
    image,
    year,
    desc,
    director,
    duration,
    language,
    genres,
    cast,
    rating,
    trailer,
  } = req.body;
  const movieExists = await Movies.findOne({ name });
  if (movieExists) {
    res.status(400);
    throw new Error("Movie already exists");
  }

  const movie = new Movies({
    name,
    image,
    year,
    desc,
    director,
    duration,
    language,
    genres,
    cast,
    rating,
    trailer,
  });
  if (movie) {
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } else {
    res.status(400);
    throw new Error("Invalid movie data");
  }
});

// @desc     Update a movie
// route     POST /api/movies/:id
// @access   Private/Admin
export const updateMovie = expressAsyncHandler(async (req, res) => {
  const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.status(201).json(movie);
});

// @desc     Delete a movie
// route     DELETE /api/movies/:id
// @access   Private/Admin
export const deleteMovie = expressAsyncHandler(async (req, res) => {
  const movie = await Movies.findByIdAndDelete(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.status(201).json({ message: "Movie deleted successfully" });
});

// @desc     Delete comment
// route     DELETE /api/movies/comments
// @access   Private/Admin
export const deleteComment = expressAsyncHandler(async (req, res) => {
  const { movieId, reviewId } = req.body;
  console.log(movieId, reviewId);
  const movie = await Movies.findById(movieId);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  const reviewIndex = movie.reviews.findIndex(
    (r) => r._id.toString() === reviewId
  );
  if (reviewIndex === -1) {
    res.status(404);
    throw new Error("Comment not found");
  }

  movie.reviews.splice(reviewIndex, 1);
  movie.numberOfReviews = movie.reviews.length;
  movie.rating =
    movie.reviews.length > 0
      ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length
      : 0;

  await movie.save();
  res.status(201).json({ message: "Comment deleted successfully" });
});
