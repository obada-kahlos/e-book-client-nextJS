import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    example: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const { useExampleQuery } = extendedApi;
