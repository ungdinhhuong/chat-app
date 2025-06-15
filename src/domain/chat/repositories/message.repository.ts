import { Message } from 'src/domain/chat/entities/message.entity';

export interface MessageRepository {
  create(message: Message): Promise<string>;
}
