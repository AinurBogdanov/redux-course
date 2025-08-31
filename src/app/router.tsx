import { createBrowserRouter, Link, Outlet, redirect } from 'react-router';
import { store } from './store';
import { UsersList } from '../modules/users/users-list';
import UserInfo from '../modules/users/user-info';
import { Counters } from '../modules/counters/counters';
import { usersSlice } from '../modules/users/users.slice';

const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
  });

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="container p-5 flex flex-col gap-5">
        <header className="py-5 flex gap-4">
          <Link to="users">Users</Link>
          <Link to="counters">Counters</Link>
        </header>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => redirect('/users'),
      },
      {
        path: 'users',
        element: <UsersList />,
        loader: () => {
          loadStore().then(() => {
            store.dispatch(usersSlice.actions.fetchUsers());
          });
          return null;
        },
      },
      {
        path: 'users/:userId',
        element: <UserInfo />,
        loader: ({ params }) => {
          loadStore().then(() => {
            if (params.userId) {
              store.dispatch(usersSlice.actions.fetchUser({ userId: params.userId }));
            }
          });
          return null;
        },
      },
      {
        path: 'counters',
        element: <Counters />,
      },
    ],
  },
]);
