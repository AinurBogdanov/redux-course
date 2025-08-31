import { memo, useState } from 'react';
import type { User } from './users.slice';
import { useNavigate } from 'react-router';
import { usersApi } from './api';

export function UsersList() {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

  const { data: users, isLoading } = usersApi.useGetUsersQuery();

  if (!users) return;

  const sortedUsers = [...users].sort((a, b) => {
    if (sortType === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  if (isLoading) {
    return <div>💀 Loading ...</div>;
  }
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
            <UserListItem user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const UserListItem = memo(function UserListItem({ user: user }: { user: User }) {
  const navigate = useNavigate();
  if (!user) return;

  const handleUserClick = () => {
    navigate(user.id, { relative: 'path' });
  };

  return (
    <li className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});
