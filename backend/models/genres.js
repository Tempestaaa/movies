import mongoose from "mongoose";

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 32,
    trim: true,
  },
});

const Genres = mongoose.model("genre", genreSchema);

export default Genres;
