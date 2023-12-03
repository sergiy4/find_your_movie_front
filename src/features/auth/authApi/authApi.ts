import { apiSlice } from '../../../app/api/apiSlice';
import { LoginCredentials, UserInfo } from '../types';
import { setCredentials } from './authSlice';
import { Logout } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<void, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/signUp',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation<UserInfo, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    sendLogout: builder.mutation<unknown, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // console.log('fdgdfg');
          // console.log(Logout().type);
          dispatch(Logout());

          // dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),

    refresh: builder.mutation<UserInfo, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useRefreshMutation,
  useSendLogoutMutation,
} = authApiSlice;
