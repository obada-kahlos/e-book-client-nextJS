import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  tagTypes: ["Books", "Auth"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7146" }),
  endpoints: () => ({}),
});
