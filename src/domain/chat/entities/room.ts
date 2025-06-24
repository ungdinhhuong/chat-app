import { User } from 'src/domain/user/entities/user';
import { RoomType } from 'src/domain/chat/value_objects/room-type';
import { Message } from 'src/domain/chat/entities/message';

export class Room {
  id: string;
  name: string;
  members: User[];
  creator: User;
  type: RoomType;
  lastMessage?: Message;
  created?: Date;
  updated?: Date;

  static fromId(id: string): Room {
    const room = new Room();
    room.id = id;
    return room;
  }
}
