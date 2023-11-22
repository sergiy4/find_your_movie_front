import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInfo, AuthInitialState } from '../types';
import { RootState } from '../../../app/store';
const initialState: AuthInitialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    Logout: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, Logout } = authSlice.actions;
export default authSlice.reducer;
export const SelectToken = (state: RootState) => state.auth.token;
