export interface User {
  id?: string;
  email: string;
  password: string;
  username?: string;
}

export interface Token {
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  user: User;
  token: Token;
}

export interface AuthState {
  user: User | null;
  token: Token | null;
  isLogged: boolean;
}
