import { MovieType } from "../../types/MovieType";
import { apiSlice } from "../apiSlice";
import { MOVIES_URL, UPLOAD_URL } from "../constants";

export const movieApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMovie: builder.mutation<MovieType, Omit<MovieType, "_id">>({
      query: (data) => ({
        url: `${MOVIES_URL}/admin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Movie"],
    }),

    updateMovie: builder.mutation({
      query: (data) => ({
        url: `${MOVIES_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Movie"],
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIES_URL}/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),

    getMovies: builder.query<MovieType[], void>({
      query: () => `${MOVIES_URL}/all`,
      providesTags: ["Movie"],
    }),

    getMovie: builder.query({
      query: (id) => `${MOVIES_URL}/movie/${id}`,
      providesTags: ["Movie"],
    }),

    uploadPoster: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/poster`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateMovieMutation,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
  useGetMovieQuery,
  useGetMoviesQuery,
  useUploadPosterMutation,
} = movieApi;
