import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

export type UsersState = {
  entities: Record<UserId, User>;
  ids: string[];
  selectedUserId: UserId | undefined;
  fetchUsersStatus: 'idle' | 'pending' | 'success' | 'failed';
};
const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
  fetchUsersStatus: 'idle',
};

export const initialUsers = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: initialUsersState,
  selectors: {
    selectedUserId: (state) => state.selectedUserId,
    selectSortedUsers: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: 'asc' | 'desc') => sort,
      (ids, entities, sort) => {
        return ids
          .map((id) => entities[id])
          .sort((a, b) => {
            if (sort === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });
      },
    ),
    selectSelectedUser: (state) => state.selectedUserId,
    selectUser: (state, id) => state.entities[id],
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === 'pending',
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === 'idle',
  },
  reducers: {
    fetchUsersPending: (state) => {
      state.fetchUsersStatus = 'pending';
    },
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
      state.fetchUsersStatus = 'success';
      const users = action.payload.users;
      state.entities = users.reduce<Record<UserId, User>>((acc, u) => {
        acc[u.id] = u;
        return acc;
      }, {});
      state.ids = users.map((u) => u.id);
    },
    fetchUsersFailed: (state) => {
      state.fetchUsersStatus = 'failed';
    },
    select: (state, action: PayloadAction<{ userId: UserId }>) => {
      state.selectedUserId = action.payload.userId;
    },
    unselect: (state) => {
      state.selectedUserId = undefined;
    },
  },
});
