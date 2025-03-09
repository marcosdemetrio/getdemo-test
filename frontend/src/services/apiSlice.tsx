import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Demo, Frame, UpdateFrameRequest } from '../types'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Demo', 'Frame'] as const,
  endpoints: builder => ({
    getDemos: builder.query<Demo[], void>({
      query: () => '/demos',
      providesTags: ['Demo'],
    }),
    getFrames: builder.query<Frame[], string>({
      query: demoId => `/demos/${demoId}/frames`,
      providesTags: ['Frame'],
    }),
    updateFrame: builder.mutation<Frame, UpdateFrameRequest>({
      query: frame => ({
        url: `/frames/${frame.id}`,
        method: 'PUT',
        body: frame,
      }),
      invalidatesTags: ['Frame'],
    }),
  }),
})

export const { useGetDemosQuery, useGetFramesQuery, useUpdateFrameMutation } = apiSlice
