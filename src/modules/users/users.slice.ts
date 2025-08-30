import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
};
const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: 'idle',
  fetchUserStatus: 'idle',
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

    selectIsFetchUserIdle: (state) => state.fetchUsersStatus === 'idle',
    selectIsFetchUserPending: (state) => state.fetchUsersStatus === 'pending',
  },
  reducers: {
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
      state.fetchUsersStatus = 'success';
      const users = action.payload.users;
      state.entities = users.reduce<Record<UserId, User>>((acc, u) => {
        acc[u.id] = u;
        return acc;
      }, {});
      state.ids = users.map((u) => u.id);
    },
    fetchUsersPending: (state) => {
      state.fetchUsersStatus = 'pending';
    },
    fetchUsersFailed: (state) => {
      state.fetchUsersStatus = 'failed';
    },

    fetchUserSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.fetchUserStatus = 'success';
      state.entities[action.payload.user.id] = action.payload.user;
    },
    fetchUserPending: (state) => {
      state.fetchUserStatus = 'pending';
    },
    fetchUserFailed: (state) => {
      state.fetchUserStatus = 'failed';
    },
  },
});
