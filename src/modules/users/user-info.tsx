import { useNavigate, useParams } from 'react-router';
import type { UserId } from './users.slice';
import { usersApi } from './api';

function UserInfo() {
  const { userId = '' } = useParams<{ userId: UserId }>();
  const navigate = useNavigate();

  const [deleteUser] = usersApi.useDeleteUserMutation();

  const { data: user, isLoading } = usersApi.useGetUserQuery(userId);
  if (isLoading || !user) {
    return <div>💀 Loading ...</div>;
  }

  function handleDelete() {
    deleteUser(userId);
    navigate('..', { relative: 'path' });
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
