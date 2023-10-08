import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://6522e06bf43b179384150021.mockapi.io' }),
   tagTypes: ['Heroes'],
   endpoints: builder => ({
      getHeroes: builder.query({
         query: () => '/heroes',
         providesTags: ['Heroes']
      }),
      createHero: builder.mutation({
         query: hero => ({
            url: '/heroes',
            method: 'POST',
            body: hero
         }),
         invalidatesTags: ['Heroes']
      }),
      deleteHero: builder.mutation({
         query: id => ({
            url: `/heroes/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Heroes']
      })
   })
})

export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation } = apiSlice