import {
  createAsyncThunk,
  type ThunkAction,
  type UnknownAction,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import type { store } from '../app/store';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { extraArgument } from '../app/extra-arguments';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>;

export const useAppSelector = useSelector.withTypes<AppState>(); // возвращает типизированы селектор
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();
export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export type ExtraArgument = typeof extraArgument;
