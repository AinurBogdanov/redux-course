import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { countersReducer } from './modules/counters/counters.slice';
import { usersSlice } from './modules/users/users.slice';

const reducer = combineReducers({
  counters: countersReducer,
  [usersSlice.name]: usersSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
});

export type AppState = ReturnType<typeof store.getState>; // то что возращает getState будет записано в тип AppState ReturnType utility type
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>(); // возвращает типизированы селектор
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
