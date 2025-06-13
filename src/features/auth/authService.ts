import axios, { ApiResponse } from '@/services/axiosClient';

export interface User {
  email: string;
  password: string;
  name?: string;
}

export interface Token {
  token_type: string;
  expires_in: number;
  expires_at: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  user: User;
  token: Token;
}

export type LoginResponse = ApiResponse<LoginPayload>;

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    return await axios.post('/auth/login', { email, password });
  }

  async register(user: User): Promise<ApiResponse<any>> {
    return await axios.post('/auth/register', { ...user });
  }
}

export const authService = new AuthService();
