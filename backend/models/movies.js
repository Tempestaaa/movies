import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userImage: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const movieSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: "https://picsum.photos/id/240/200/300",
    },
    year: { type: Number, required: true },
    genres: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genre",
      required: true,
    },
    desc: { type: String, required: true },
    director: { type: String, required: true },
    cast: [{ type: String }],
    reviews: [reviewSchema],
    numberOfReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    trailer: { type: String },
    duration: { type: Number, required: true },
    language: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Movies = mongoose.model("movie", movieSchema);

export default Movies;
