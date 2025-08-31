import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { usersSlice } from '../modules/users/users.slice';

store.dispatch(usersSlice.actions.fetchUsers());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
