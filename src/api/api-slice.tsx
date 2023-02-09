import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    tagTypes:['Books'],
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: () => ({}),
});
