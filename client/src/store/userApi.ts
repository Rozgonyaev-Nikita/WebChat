import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Обратите внимание на "/react"
import { IUser } from "../types/IUser";

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/friends' }),
    endpoints: (builder) => ({
        getAllUsersByLogin: builder.query<IUser[], {inputValue: string, id: string}>({
            query: ({inputValue, id}) => `listAddFriend?search=${inputValue}&id=${id}`,
            providesTags: (result) => {
                if (!Array.isArray(result)) {
                  return [{ type: 'Users', id: 'LIST' }];
                }
                
                return [
                  ...result.map(({ _id }) => ({ type: 'Users', id: _id } as const)),
                  { type: 'Users', id: 'LIST' },
                ];
              },}),
              getMyFriendsByLogin: builder.query<IUser[], {search: string, userId: string}>({
                query: ({search, userId}) => `myFriends?search=${search}&userId=${userId}`,
                providesTags: (result) => {
                    if (!Array.isArray(result)) {
                      return [{ type: 'Users', id: 'LIST' }];
                    }
                    
                    return [
                      ...result.map(({ _id }) => ({ type: 'Users', id: _id } as const)),
                      { type: 'Users', id: 'LIST' },
                    ];
                  },}),
                  getWaitFriends: builder.query<IUser[], {search: string, userId: string}>({
                    query: ({search, userId}) => `friendRequests?search=${search}&id=${userId}`,
                    providesTags: (result) => {
                        if (!Array.isArray(result)) {
                          return [{ type: 'Users', id: 'LIST' }];
                        }
                        
                        return [
                          ...result.map(({ _id }) => ({ type: 'Users', id: _id } as const)),
                          { type: 'Users', id: 'LIST' },
                        ];
                      },}),
              patchFriends: builder.mutation<IUser[], {myId: string; friendId: string; action: string}>({
                query: (body) => ({
                  url: 'addNewFriend',
                  method: 'PATCH',
                  body,
                }),
                invalidatesTags: [{type: 'Users', id: 'LIST'}]
              })
    })
});

export const { useGetAllUsersByLoginQuery, useGetMyFriendsByLoginQuery, usePatchFriendsMutation, useGetWaitFriendsQuery } = userApi;
