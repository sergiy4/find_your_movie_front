import {
  configureStore,
  combineReducers,
  PreloadedState,
  AnyAction,
  Reducer,
} from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authApi/authSlice';
import findYourMovieReducer from '../features/findYourMovie/FYMSlice/FYMSlice';

export const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  fym: findYourMovieReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/Logout') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer as Reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    preloadedState,
  });
};
export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
