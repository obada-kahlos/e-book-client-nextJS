import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookByGenre: builder.query({
      query: (id) => ({
        url: `/api/Books/get-book-by-genre/${id}?PageSize=6`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetBookByGenreQuery } = extendedApi;
