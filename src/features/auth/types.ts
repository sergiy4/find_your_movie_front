export interface User {
  id?: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserInfo {
  accessToken: string;
}

export interface AuthInitialState {
  token: null | string;
}
