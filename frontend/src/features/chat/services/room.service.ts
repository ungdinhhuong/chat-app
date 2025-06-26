import axios from "@/services/axiosClient";
import {LIMIT_PAGE} from "@/consts/CONST";
import {ApiResponse, PaginatedResponse} from "@/types/api.type";
import {RoomPayload} from "@/features/chat/types/room.type";

class RoomService {
  async getRooms(userId: string, page: number = 1, limit: number = LIMIT_PAGE): Promise<ApiResponse<PaginatedResponse<RoomPayload>>> {
    return await axios.get('/rooms', {
      params: {
        userId,
        limit,
        page,
      }
    });
  }
}

export const roomService = new RoomService();
