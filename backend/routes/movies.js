import express from "express";
import { authenticate, authorized } from "../middlewares/auth.js";
import checkId from "../middlewares/checkId.js";
import {
  createMovie,
  createReview,
  deleteComment,
  deleteMovie,
  getMovie,
  getMovies,
  getNewMovies,
  getRandomMovies,
  getTopMovies,
  updateMovie,
} from "../controllers/movies.js";

const router = express.Router();

// ********** PUBLIC **********
router.get("/all", getMovies);
router.get("/movie/:id", getMovie);
router.get("/new", getNewMovies);
router.get("/top", getTopMovies);
router.get("/random", getRandomMovies);

// ********** PRIVATE **********
router.post("/:id/reviews", authenticate, checkId, createReview);

// ********** ADMIN **********
router.post("/admin", authenticate, authorized, createMovie);

router
  .route("/admin/:id")
  .put(authenticate, authorized, updateMovie)
  .delete(authenticate, authorized, deleteMovie);

router.delete("/comments", authenticate, authorized, deleteComment);
export default router;
