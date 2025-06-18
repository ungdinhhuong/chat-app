import { User } from 'src/domain/user/entities/user';
import { Room } from 'src/domain/chat/entities/room';
import { MessageType } from 'src/domain/chat/value_objects/message-type';

export class Message {
  id: string;
  content: string;
  sender?: User | null;
  room: Room;
  type: MessageType;
  isEdited: boolean;
  created?: Date;
  updated?: Date;
}
