import { Inject, Injectable } from '@nestjs/common';
import { MessageModel } from 'src/infrastructure/database/schemas/message.model';
import { MessageRepository } from 'src/domain/chat/repositories/message.repository';
import { REPOSITORY } from 'src/shared/constants/type';
import { Message } from 'src/domain/chat/entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject(REPOSITORY.MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {
  }

  async createMessage(messageData: any): Promise<Message> {
    return new Message();
  }

  async getMessages(roomId: string, page = 1, limit = 50): Promise<Message[]> {
    return [new Message()];
  }
}
