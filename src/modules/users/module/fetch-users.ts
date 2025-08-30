import type { AppThunk } from '../../../store';
import { usersSlice } from '../users.slice';

export const fetchUsers =
  ({ refetch = false }: { refetch?: boolean }): AppThunk<Promise<void>> =>
  async (dispatch, getState, { api }) => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
    if (!isIdle && !refetch) return;

    dispatch(usersSlice.actions.fetchUsersPending());

    return api
      .getUsers()
      .then((users) => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users: users }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(usersSlice.actions.fetchUsersFailed());
      });
  };
