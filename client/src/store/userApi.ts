import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Обратите внимание на "/react"
import { IUser } from "../types/IRoom";

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/friends' }),
    endpoints: (builder) => ({
        getMyFriendsByLogin: builder.query<IUser[], string>({
            query: (search) => `?search=${search}`,
            providesTags: (result) => {
                if (!Array.isArray(result)) {
                  return [{ type: 'Users', id: 'LIST' }];
                }
                
                return [
                  ...result.map(({ _id }) => ({ type: 'Users', id: _id } as const)),
                  { type: 'Users', id: 'LIST' },
                ];
              },}),
    })
});

export const { useGetMyFriendsByLoginQuery } = userApi;
