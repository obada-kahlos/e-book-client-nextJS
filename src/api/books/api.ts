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
    getGenre: builder.query({
      query: () => ({
        url: "/api/AdminBooks/get-genres",
        method: "GET",
      }),
    }),
    getSearch: builder.query({
      query: ({ word }) => ({
        url: `/api/Books/search-of-books?title=${word}&PageNumber=10&PageSize=10`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBookByGenreQuery,
  useGetBookByIdQuery,
  useGetGenreQuery,
  useGetSearchQuery,
} = extendedApi;
