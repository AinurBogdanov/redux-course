import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { extraArgument } from '../app/extra-arguments';
import { countersReducer } from '../modules/counters/counters.slice';
import { usersSlice } from '../modules/users/users.slice';

const reducer = combineReducers({
  counters: countersReducer,
  [usersSlice.name]: usersSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
});
