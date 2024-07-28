import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRoom } from '../types/IRoom'

export const roomApi = createApi({
    reducerPath: 'roomApi',
    tagTypes: ['Rooms'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
      getRoomApiByUser: builder.query<IRoom[], string>({
        query: (user) => `getAllrooms/${user}`,
        providesTags: (result) =>
          // is result available?
          result
            ? // successful query
              [
                ...result.map(({ _id }) => ({ type: 'Rooms', _id } as const)),
                { type: 'Rooms', id: 'LIST' },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
              [{ type: 'Rooms', id: 'LIST' }],
      }),
      addMessageinRoom: builder.mutation({
        query: (body) => ({
          url: 'addMessage',
          method: 'POST',
          body
        }),
        // invalidatesTags: [{type: 'Rooms', id: 'LIST'}]
      }),
      addRoom: builder.mutation({
        query: (body) => ({
          url: 'addRoom',
          method: 'POST',
          body
        }),
        invalidatesTags: [{type: 'Rooms', id: 'LIST'}]
      })
    }),
  })

  export const { useGetRoomApiByUserQuery, useAddRoomMutation, useAddMessageinRoomMutation } = roomApi;