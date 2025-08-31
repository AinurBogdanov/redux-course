import z from 'zod';
import { baseApi } from '../../shared/api';
import type { User, UserId } from './users.slice';

const UserDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users', { type: 'Users', id: 'LIST' }],
      transformResponse: (res: unknown) => UserDtoSchema.array().parse(res),
    }),
    getUser: create.query<User, UserId>({
      query: (id) => `/users/${id}`,
      providesTags: (_, __, userId) => ['Users', { type: 'Users', id: userId }],
      transformResponse: (res: unknown) => UserDtoSchema.parse(res),
    }),
    deleteUser: create.mutation<void, UserId>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        providesTags: ['Users'],
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useDeleteUserMutation, useGetUsersQuery, useGetUserQuery } = usersApi;
