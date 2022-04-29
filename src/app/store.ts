import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer, { TodoState } from '../features/todo/slice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
export interface ReduxState {
  todos: TodoState;
}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
