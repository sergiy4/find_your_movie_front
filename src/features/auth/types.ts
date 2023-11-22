export interface User {
  id?: string;
  username: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserInfo {
  accessToken: string;
}

export interface AuthInitialState {
  token: null | string;
}
