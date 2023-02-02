import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = 'http://localhost:5050';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            if (!headers.has("Content-Type")) {
                headers.set("Content-Type", "application/json");
            }
            return headers
        }
    }),
    tagTypes: ['Posts'],
    endpoints: builder => ({})
})