import { GenreType } from "../../types/GenreType";
import { apiSlice } from "../apiSlice";
import { GENRES_URL } from "../constants";

const genreApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation<GenreType, Pick<GenreType, "name">>({
      query: (data) => ({
        url: `${GENRES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Genre"],
    }),

    updateGenre: builder.mutation({
      query: ({ _id, name }) => ({
        url: `${GENRES_URL}/${_id}`,
        method: "PUT",
        body: name,
      }),
      invalidatesTags: ["Genre"],
    }),

    deleteGenre: builder.mutation<void, string>({
      query: (id) => ({
        url: `${GENRES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),

    getGenres: builder.query<GenreType[], void>({
      query: () => `${GENRES_URL}`,
      providesTags: ["Genre"],
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGetGenresQuery,
} = genreApi;
