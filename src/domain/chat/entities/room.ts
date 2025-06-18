import { User } from 'src/domain/user/entities/user';
import { ChatRoomType } from 'src/domain/chat/value_objects/chat-room-type';

export class Room {
  id: string;
  name: string;
  members: User[];
  creator: User;
  type: ChatRoomType;
  createdAt?: Date;
  updatedAt?: Date;

  static fromId(id: string): Room {
    const room = new Room();
    room.id = id;
    return room;
  }
}
