import "dotenv/config";
import express from "express";
import dbConnect from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/users.js";
import genreRouter from "./routes/genres.js";
import movieRouter from "./routes/movies.js";
import uploadRouter from "./routes/upload.js";

import { errorHandler, notFound } from "./middlewares/error.js";

// Initial
dbConnect();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 3000;

// Routes
app.use("/api/users", userRouter);
app.use("/api/genres", genreRouter);
app.use("/api/movies", movieRouter);
app.use("/api/upload", uploadRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
