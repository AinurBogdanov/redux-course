import { useNavigate, useParams } from 'react-router';
import { usersSlice, type UserId } from './users.slice';
import { useAppSelector, useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { fetchUser } from './module/fetch-user';
import { deleteUser } from './module/delete-user';

function UserInfo() {
  const { userId = '' } = useParams<{ userId: UserId }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUserPending);
  const user = useAppSelector((state) => usersSlice.selectors.selectUserById(state, userId));

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (isPending || !user) {
    console.log(user, isPending);
    return <div>Loading ...</div>;
  }

  function handleDelete() {
    console.log(userId);
    dispatch(deleteUser(userId)).then(() => navigate('..', { relative: 'path' }));
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

// [
//   {
//     "id": "4",
//     "name": "Rahul Mehta",
//     "description": "Mobile developer, flutter expert, gamer."
//   },
//   {
//     "id": "5",
//     "name": "Maria Lopez",
//     "description": "QA engineer, enjoys travel and yoga."
//   },
//   {
//     "id": "7",
//     "name": "Sophia Muller",
//     "description": "UX/UI designer, art lover, cyclist."
//   },
//   {
//     "id": "8",
//     "name": "Jake Peterson",
//     "description": "Frontend developer, React enthusiast, coffee lover."
//   },
//   {
//     "id": "9",
//     "name": "Yasmine Chen",
//     "description": "Backend engineer, Go specialist, hiker."
//   },
//   {
//     "id": "10",
//     "name": "Anna Ivanova",
//     "description": "Project manager, Scrum Master, bookworm."
//   },
//   {
//     "id": "11",
//     "name": "Olivier Dubois",
//     "description": "DevOps engineer, Docker guru, music fan."
//   },
//   {
//     "id": "12",
//     "name": "Carla Moretti",
//     "description": "Data scientist, Python addict, chess player."
//   },
//   {
//     "id": "13",
//     "name": "Samuel Lee",
//     "description": "Android developer, foodie, travel photographer."
//   }
// ]
