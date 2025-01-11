import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRoom } from '../types/IRoom'

export const roomApi = createApi({
    reducerPath: 'roomApi',
    tagTypes: ['Rooms'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
      // getRoomApiByUser: builder.query<IRoom[], string>({
      //   query: (user) => `getAllrooms/${user}`,
      //   providesTags: (result) =>
      //     // is result available?
      //     result
      //       ? // successful query
      //         [
      //           ...result.map(({ _id }) => ({ type: 'Rooms', _id } as const)),
      //           { type: 'Rooms', id: 'LIST' },
      //         ]
      //       : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
      //         [{ type: 'Rooms', id: 'LIST' }],
      // }),
      
      getRoomApiByUser: builder.query<IRoom[], string>({
        query: (user) => `getAllrooms/${user}`,
        transformResponse: (response: IRoom[] | undefined) => {
          console.log(response);
          if (!response) {
              return []; // Возвращаем пустой массив, если response undefined
          }
      
          // Сортируем данные по дате последнего сообщения
          return response.sort((a, b) => {
              const dateA = a.lastMessage?.date; // Используем опциональную цепочку
              const dateB = b.lastMessage?.date; // Используем опциональную цепочку
      
              // Если lastMessage или date равны null, помещаем такие комнаты в конец списка
              if (dateA === undefined) return 1;
              if (dateB === undefined) return -1;
      
              if (dateA < dateB) return 1;
              if (dateA > dateB) return -1;
              return 0;
          });
      },
      
        providesTags: (result) =>
            result
                ? [
                    ...result.map(({ _id }) => ({ type: 'Rooms', _id } as const)),
                    { type: 'Rooms', id: 'LIST' },
                  ]
                : [{ type: 'Rooms', id: 'LIST' }],
    }),
      addMessageinRoom: builder.mutation({
        query: (body) => ({
          url: 'addMessage',
          method: 'POST',
          body
        }),
        invalidatesTags: [{type: 'Rooms', id: 'LIST'}]
      }),
      addGroupRoom: builder.mutation({
        query: (body) => ({
          url: 'room/addGroupRoom',
          method: 'POST',
          body
        }),
        invalidatesTags: [{type: 'Rooms', id: 'LIST'}]
      }),
      addPrivateRoom: builder.mutation({
        query: (body) => ({
          url: 'room/addPrivateRoom',
          method: 'POST',
          body //{myId: string, hisId: string}
        }),
        invalidatesTags: [{type: 'Rooms', id: 'LIST'}]
      }),
      patchReadMessage: builder.mutation<IRoom[], {roomId: string; authorId: string}>({
        query: (body) => ({
          url: 'room/markAsRead',
          method: 'PATCH',
          body //{myId: string, hisId: string} {roomId: room._id: string, authorId: string}
        }),
        invalidatesTags: [{type: 'Rooms', id: 'LIST'}]
      }),
    }),
    
  })

  export const { useGetRoomApiByUserQuery, useAddGroupRoomMutation, useAddMessageinRoomMutation, useAddPrivateRoomMutation, usePatchReadMessageMutation } = roomApi;