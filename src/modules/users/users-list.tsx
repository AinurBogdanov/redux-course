import { memo, useState } from 'react';
import { useAppSelector } from '../../shared/redux';
import { usersSlice, type User, type UserId } from './users.slice';
import { useNavigate } from 'react-router';

export function UsersList() {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
  console.count('update UserList');

  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType),
  );

  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
}

const UserListItem = memo(function UserListItem({ userId }: { userId: UserId }) {
  const user = useAppSelector((state) => usersSlice.selectors.selectUserById(state, userId));
  const navigate = useNavigate();
  if (!user) return;
  const handleUserClick = () => {
    navigate(userId, { relative: 'path' });
  };

  return (
    <li className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});
