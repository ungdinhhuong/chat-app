import axios from '@/services/axiosClient';
import {ApiResponse} from "@/types/api.type";
import {LoginPayload, User} from "@/features/auth/types/auth.type";

class AuthService {
  async login(email: string, password: string): Promise<ApiResponse<LoginPayload>> {
    return await axios.post('/auth/login', { email, password });
  }

  async register(user: User): Promise<ApiResponse<any>> {
    return await axios.post('/auth/register', { ...user });
  }
}

export const authService = new AuthService();
