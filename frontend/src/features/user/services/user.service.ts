import axios from "@/services/axiosClient";
import {ApiResponse} from "@/types/api.type";
import {UserPayload} from "@/features/user/types/user.type";

class UserService {
  async getUserOnline(): Promise<ApiResponse<UserPayload[]>> {
    return await axios.get('/users/online');
  }
}

export const userService = new UserService();
