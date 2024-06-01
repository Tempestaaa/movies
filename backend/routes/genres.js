import express from "express";
import { authenticate, authorized } from "../middlewares/auth.js";
import {
  createGenre,
  deleteGenre,
  getGenres,
  updateGenre,
  getGenre,
} from "../controllers/genres.js";

const router = express.Router();

// ********** PUBLIC **********
router.route("/").get(getGenres);
router.route("/:id").get(getGenre);

// ********** ADMIN **********
router.route("/").post(authenticate, authorized, createGenre);
router
  .route("/:id")
  .put(authenticate, authorized, updateGenre)
  .delete(authenticate, authorized, deleteGenre);

export default router;
