import { MessageRepository } from 'src/domain/chat/repositories/message.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageModel } from 'src/infrastructure/database/schemas/message.model';
import { Model } from 'mongoose';
import { Message } from 'src/domain/chat/entities/message.entity';

@Injectable()
export class MessageRepositoryImpl implements MessageRepository {
  constructor(
    @InjectModel(MessageModel.name) private messageModel: Model<MessageModel>,
  ) {
  }

  create(message: Message): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
