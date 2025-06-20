import {LIMIT_PAGE} from "@/consts/CONST";
import axios from "@/services/axiosClient";
import {ApiResponse, PaginatedResponse} from "@/types/api.type";
import {MessagePayload} from "@/features/chat/types/message.type";

class MessageService {
  async getMessages(roomId: string, page: number = 1, limit: number = LIMIT_PAGE): Promise<ApiResponse<PaginatedResponse<MessagePayload>>> {
    return await axios.get('/messages', {
      params: {
        roomId,
        limit,
        page
      }
    });
  }
}

export const messageService = new MessageService();
