import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, type AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { initialUsers, usersSlice, type User, type UserId } from './users.slice';

export function UsersList() {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc'); // изменять выбранный способ в редаксе
  const dispatch = useAppDispatch();
  const { selectedUserId, selectSortedUsers } = usersSlice.selectors;

  const { store } = usersSlice.actions;

  useEffect(() => {
    dispatch(store({ users: initialUsers }));
  }, []);

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
        <SelectedUser userId={selectedUser} />
      )}
    </div>
  );
}

const UserListItem = memo(function UserListItem({ userId }: { userId: UserId }) {
  const user = useAppSelector((state) => usersSlice.selectors.selectSelectedUser(state, userId));

  const dispatch = useDispatch<AppDispatch>();

  const handleUserClick = () => {
    dispatch({ type: 'selectUser', payload: { userId: userId } });
  };

  return (
    <li className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});

function SelectedUser({ userId }: { userId: UserId }) {
  const user = useAppSelector((state) => usersSlice.selectors.selectSelectedUser(state, userId));

  const dispatch = useDispatch<AppDispatch>();
  const handleUserClick = () => {
    dispatch({ type: 'unselectUser' });
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
