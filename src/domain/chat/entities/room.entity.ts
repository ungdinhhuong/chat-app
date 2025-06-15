import { User } from 'src/domain/user/entities/User';
import { ChatRoomType } from 'src/domain/chat/value_objects/chat-room-type';

export class Room {
  id: string;
  name: string;
  members: User[];
  creator: User;
  type: ChatRoomType;
}
