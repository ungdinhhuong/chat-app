import { Message } from 'src/domain/chat/entities/message';

export interface MessageRepository {
  create(message: Message): Promise<string>;
  getMessagesByRoomId(roomId: string, limit?: number, offset?: number): Promise<[Message[], number]>;
}
