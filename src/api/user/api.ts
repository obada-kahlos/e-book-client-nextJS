import { apiSlice } from "../api-slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInf: builder.query({
      query: () => ({
        url: "/api/ClientProfile/get-user-profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserInfQuery } = extendedApi;
