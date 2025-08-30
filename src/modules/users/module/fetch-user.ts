import type { AppThunk } from '../../../store';
import { usersSlice, type UserId } from '../users.slice';

export const fetchUser =
  (id: UserId): AppThunk =>
  (dispatch, getState, { api }) => {
    const isPending = usersSlice.selectors.selectIsFetchUserPending(getState());
    if (!isPending) return;

    dispatch(usersSlice.actions.fetchUsersPending());

    api
      .getUser(id)
      .then((user) => {
        dispatch(usersSlice.actions.fetchUserSuccess({ user: user }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(usersSlice.actions.fetchUserFailed());
      });
  };
