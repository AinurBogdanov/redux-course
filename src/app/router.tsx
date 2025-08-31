import { createBrowserRouter, Link, Outlet, redirect } from 'react-router';
import { store } from './store';
import { UsersList } from '../modules/users/users-list';
import UserInfo from '../modules/users/user-info';
import { Counters } from '../modules/counters/counters';
import { usersApi } from '../modules/users/api';

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
            store.dispatch(usersApi.util.prefetch('getUsers', undefined, { force: true }));
          });
          return null;
        },
      },
      {
        path: 'users/:userId',
        element: <UserInfo />,
      },
      {
        path: 'counters',
        element: <Counters />,
      },
    ],
  },
]);
