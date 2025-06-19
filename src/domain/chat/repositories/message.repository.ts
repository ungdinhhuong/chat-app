import { Message } from 'src/domain/chat/entities/message';
import { GetMessageParams } from 'src/domain/chat/interfaces/message.interface';

export interface MessageRepository {
  create(message: Message): Promise<string>;
  getMessagesByRoomId(params: GetMessageParams): Promise<[Message[], number]>;
}
