import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookByGenre: builder.query({
      query: ({ id, pageSize, pageNumber }) => ({
        url: `/api/Books/get-book-by-genre/${id}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `/api/Books/get-book-by-id/${id}`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetBookByGenreQuery, useGetBookByIdQuery } = extendedApi;
