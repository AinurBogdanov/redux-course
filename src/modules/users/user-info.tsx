import { useNavigate, useParams } from 'react-router';
import { usersSlice, type UserId } from './users.slice';
import { useAppSelector, useAppDispatch } from '../../shared/redux';
import { useEffect } from 'react';
function UserInfo() {
  const { userId = '' } = useParams<{ userId: UserId }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUserPending);
  const user = useAppSelector((state) => usersSlice.selectors.selectUserById(state, userId));

  useEffect(() => {
    dispatch(usersSlice.actions.fetchUser({ userId: userId }));
  }, [dispatch, userId]);

  if (isPending || !user) {
    return <div>Loading ...</div>;
  }

  function handleDelete() {
    dispatch(usersSlice.actions.deleteUser({ userId: userId })).then(() =>
      navigate('..', { relative: 'path' }),
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <button
          onClick={() => navigate('..', { relative: 'path' })}
          className="mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
        >
          Back
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md"
        >
          Delete
        </button>
      </div>

      <h2 className="text-3xl">UserName: {user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}
export default UserInfo;
