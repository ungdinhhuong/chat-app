import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/domain/chat/repositories/message.repository';
import { REPOSITORY } from 'src/shared/constants/type';
import { Message } from 'src/domain/chat/entities/message';
import { CreateMessageDto } from 'src/interface/rest/message/dto/create-message.dto';
import { Room } from 'src/domain/chat/entities/room';
import { User } from 'src/domain/user/entities/user';
import { MessageType } from 'src/domain/chat/value_objects/message-type';
import { GetMessagesQueryDto } from 'src/interface/rest/message/dto/get-messages-query.dto';

@Injectable()
export class MessageService {
  constructor(
    @Inject(REPOSITORY.MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {
  }

  /**
   * Tạo một tin nhắn mới
   * @param dto
   */
  async createMessage(dto: CreateMessageDto): Promise<Message> {
    const message = new Message();
    message.room = Room.fromId(dto.room_id);
    message.content = dto.content;
    message.sender = dto.sender_id ? User.fromId(dto.sender_id) : null;
    message.type = dto.type ?? MessageType.TEXT;

    await this.messageRepository.create(message);
    return message
  }

  /**
   * Lấy danh sách tin nhắn theo điều kiện
   * @param dto
   */
  async getMessages(dto: GetMessagesQueryDto): Promise<Message[]> {

    return [new Message()];
  }
}
