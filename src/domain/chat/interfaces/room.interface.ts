import { ChatRoomType } from 'src/domain/chat/value_objects/chat-room-type';

export interface FindRoomsParams {
  userId: string;
  types?: ChatRoomType[];
  offset: number;
  limit: number;
}
