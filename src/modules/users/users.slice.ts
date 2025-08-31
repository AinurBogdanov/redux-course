import { createSelector } from '@reduxjs/toolkit';
import { createSlice, type ExtraArgument } from '../../shared/redux';

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

export type UsersState = {
  entities: Record<UserId, User | undefined>;
  ids: string[];
  fetchUsersStatus: 'idle' | 'pending' | 'success' | 'failed';
  fetchUserStatus: 'idle' | 'pending' | 'success' | 'failed';
  deleteUserStatus: 'idle' | 'pending' | 'success' | 'failed';
};
const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: 'idle',
  fetchUserStatus: 'idle',
  deleteUserStatus: 'idle',
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: initialUsersState,
  selectors: {
    selectSortedUsers: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: 'asc' | 'desc') => sort,
      (ids, entities, sort) => {
        return ids
          .map((id) => entities[id])
          .filter((user): user is User => !!user)
          .sort((a, b) => {
            if (sort === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });
      },
    ),
    selectUserById: (state, userId: UserId) => state.entities[userId],

    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === 'idle',
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === 'pending',

    selectIsFetchUserIdle: (state) => state.fetchUserStatus === 'idle',
    selectIsFetchUserPending: (state) => state.fetchUserStatus === 'pending',

    selectIsDeleteUserIdle: (state) => state.deleteUserStatus === 'idle',
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === 'pending',
  },
  reducers: (creator) => ({
    fetchUser: creator.asyncThunk<User, { userId: UserId }, { extra: ExtraArgument }>(
      (params, thunkAPI) => {
        return thunkAPI.extra.api.getUser(params.userId);
      },
      {
        fulfilled: (state, action) => {
          state.fetchUserStatus = 'success';
          state.entities[action.payload.id] = action.payload;
        },
        pending: (state) => {
          state.fetchUserStatus = 'pending';
        },
        rejected: (state) => {
          state.fetchUserStatus = 'failed';
        },
      },
    ),
    fetchUsers: creator.asyncThunk<User[], void, { extra: ExtraArgument }>(
      (_, thunkAPI) => {
        return thunkAPI.extra.api.getUsers();
      },
      {
        fulfilled: (state, action) => {
          state.fetchUsersStatus = 'success';
          const users = action.payload;
          state.entities = users.reduce((acc, u) => {
            acc[u.id] = u;
            return acc;
          }, {} as Record<UserId, User>);
          state.ids = users.map((u) => u.id);
        },
        pending: (state) => {
          state.fetchUsersStatus = 'pending';
        },
        rejected: (state) => {
          state.fetchUsersStatus = 'failed';
        },
      },
    ),
    deleteUser: creator.asyncThunk<UserId, { userId: UserId }, { extra: ExtraArgument }>(
      async (params, thunkAPI) => {
        const result = await thunkAPI.extra.api.deleteUser(params.userId);
        return result;
      },
      {
        fulfilled: (state, action) => {
          state.deleteUserStatus = 'success';
          const userId = action.payload;
          delete state.entities[userId];
          state.ids.filter((id) => id !== userId);
        },
        pending: (state) => {
          state.deleteUserStatus = 'pending';
        },
        rejected: (state) => {
          state.deleteUserStatus = 'failed';
        },
      },
    ),
    //  fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
    //   state.fetchUsersStatus = 'success';
    //   const users = action.payload.users;
    //   state.entities = users.reduce<Record<UserId, User>>((acc, u) => {
    //     acc[u.id] = u;
    //     return acc;
    //   }, {});
    //   state.ids = users.map((u) => u.id);
    // },
    // fetchUsersPending: (state) => {
    //   state.fetchUsersStatus = 'pending';
    // },
    // fetchUsersFailed: (state) => {
    //   state.fetchUsersStatus = 'failed';
    // },

    // deleteUserSuccess: (state, action: PayloadAction<{ userId: UserId }>) => {
    //   state.deleteUserStatus = 'success';
    //   delete state.entities[action.payload.userId];
    //   state.ids = state.ids.filter((id) => id !== action.payload.userId);
    // },
    // deleteUserPending: (state) => {
    //   state.deleteUserStatus = 'pending';
    // },
    // deleteUserFailed: (state) => {
    //   state.deleteUserStatus = 'failed';
    // },
  }),
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.pending, (state) => {
  //     state.fetchUsersStatus = 'pending';
  //   });
  //   builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //     state.fetchUsersStatus = 'success';
  //     const users = action.payload;
  //     state.entities = users.reduce((acc: Record<UserId, User>, u: User) => {
  //       acc[u.id] = u;
  //       return acc;
  //     }, {} as Record<UserId, User>);
  //     state.ids = users.map((u: User) => u.id);
  //   });
  //   builder.addCase(fetchUsers.rejected, (state) => {
  //     state.fetchUsersStatus = 'failed';
  //   });
  // },
});
