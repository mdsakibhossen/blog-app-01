import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ["blog"],
    endpoints: (builder) => ({
       registerUser: builder.mutation({
        query: (user)=>({
            url: "/register",
            method: "POST",
            body: user
        }),
        invalidatesTags: ["blog"]
       })
    }),
})

export const { useRegisterUserMutation } = blogApi