import { User } from 'src/domain/user/entities/user';
import { Room } from 'src/domain/chat/entities/room';
import { MessageType } from 'src/domain/chat/value_objects/message-type';
import { Type } from 'class-transformer';

export class Message {
  id: string;
  content: string;

  @Type(() => User)
  sender?: User | null;

  @Type(() => Room)
  room: Room;

  type: MessageType;
  isEdited: boolean;

  @Type(() => Date)
  created?: Date;

  @Type(() => Date)
  updated?: Date;
}
