import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ pageNumber }) => ({
        url: `/api/Books/get-all-books?PageNumber=${pageNumber}&PageSize=10`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      // merge: (currentCache, newItems) => {
      //   currentCache.push(...newItems);
      // },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Books"],
    }),
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
      query: (search) => ({
        url: `/api/Books/search-of-books?title=${search}&PageNumber=1&PageSize=10`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByGenreQuery,
  useGetBookByIdQuery,
  useGetGenreQuery,
  useGetSearchQuery,
} = extendedApi;
