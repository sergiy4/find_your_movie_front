import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { setCredentials, Logout } from '../../features/auth/authApi/authSlice';
import { RootState } from '../store';
import { UserInfo } from '../../features/auth/types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/',
  credentials: 'include',
  // set the access token in the cookie in the http header
  prepareHeaders: (headers, { getState }) => {
    // I get the access token from the store
    const state = getState() as RootState;
    const token = state.auth.token;

    // if the token exists, set it in the header
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (arg, api, extraOptions) => {
  // make a request
  let result = await baseQuery(arg, api, extraOptions);
  // console.log(result);

  // if the access token has expired
  if (result?.error?.status === 403) {
    console.log(result?.error);
    console.log('sending refresh token');

    // send a token access update request
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    // if our refresh token is still valid
    if (refreshResult.data) {
      const { accessToken } = refreshResult?.data as UserInfo;

      // We set a new access token
      api.dispatch(setCredentials({ accessToken }));

      //make our request again
      result = await baseQuery(arg, api, extraOptions);
    } else {
      api.dispatch(Logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    'User',
    'Product',
    'Order',
    'Team',
    'Category',
    'Statistic',
    'Review',
  ],
  endpoints: (builder) => ({}),
});
