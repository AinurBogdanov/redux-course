import type { AppThunk } from '../../../store';
import { usersSlice, type UserId } from '../users.slice';
import { fetchUsers } from './fetch-users';

export const deleteUser =
  (id: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserPending());
    try {
      await api.deleteUser(id);
      await router.navigate('/users');
      await dispatch(fetchUsers({ refetch: true }));

      dispatch(usersSlice.actions.deleteUserSuccess({ userId: id }));
    } catch (err) {
      dispatch(usersSlice.actions.deleteUserFailed());
      console.error(err);
    }
  };
