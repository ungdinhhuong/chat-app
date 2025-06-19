import { RoomType } from 'src/domain/chat/value_objects/room-type';

export interface GetRoomsParams {
  userId: string;
  types?: RoomType[];
  offset: number;
  limit: number;
}
