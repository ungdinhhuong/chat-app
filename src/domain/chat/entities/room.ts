import { User } from 'src/domain/user/entities/user';
import { RoomType } from 'src/domain/chat/value_objects/room-type';

export class Room {
  id: string;
  name: string;
  members: User[];
  creator: User;
  type: RoomType;
  createdAt?: Date;
  updatedAt?: Date;

  static fromId(id: string): Room {
    const room = new Room();
    room.id = id;
    return room;
  }
}
