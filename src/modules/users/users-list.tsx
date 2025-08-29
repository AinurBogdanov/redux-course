import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, type AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { usersSlice, type User, type UserId } from './users.slice';
import { api } from '../../shared/api';

export function UsersList() {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc'); // изменять выбранный способ в редаксе
  const dispatch = useAppDispatch();
  const { selectedUserId, selectSortedUsers } = usersSlice.selectors;

  useEffect(() => {
    dispatch(usersSlice.actions.fetchUsersPending());
    api
      .getUsers()
      .then((users) => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users: users }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(usersSlice.actions.fetchUsersFailed());
      });
  }, [dispatch]);

  const sortedUsers = useAppSelector((state) => selectSortedUsers(state, sortType));
  // console.log(sortedUsers);

  const selectedUser = useAppSelector((state) => selectedUserId(state));

  return (
    <div className="flex flex-col items-center">
      {!selectedUser ? (
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-row items-center">
            <button
              onClick={() => setSortType('asc')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Asc
            </button>
            <button
              onClick={() => setSortType('desc')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Desc
            </button>
          </div>
          <ul className="list-none">
            {sortedUsers.map((user: User) => (
              <UserListItem userId={user.id} key={user.id} />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser />
      )}
    </div>
  );
}

const UserListItem = memo(function UserListItem({ userId }: { userId: UserId }) {
  const user = useAppSelector((state) => usersSlice.selectors.selectUser(state, userId));

  const dispatch = useDispatch<AppDispatch>();

  const handleUserClick = () => {
    dispatch(usersSlice.actions.select({ userId }));
  };

  return (
    <li className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});

function SelectedUser() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useAppSelector((state) => usersSlice.selectors.selectSelectedUser(state));
  const user = useAppSelector((state) => usersSlice.selectors.selectUser(state, userId));

  const handleUserClick = () => {
    dispatch(usersSlice.actions.unselect());
  };
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleUserClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">UserName: {user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}
