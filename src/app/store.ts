import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { countersReducer } from '../modules/counters/counters.slice';

import { router } from './router';
import { baseApi } from '../shared/api';

export const extraArgument = {
  router,
};

const reducer = combineReducers({
  counters: countersReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(baseApi.middleware),
});
