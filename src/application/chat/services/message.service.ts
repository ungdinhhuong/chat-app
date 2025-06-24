import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/domain/chat/repositories/message.repository';
import { REPOSITORY } from 'src/shared/constants/type';
import { Message } from 'src/domain/chat/entities/message';
import { CreateMessageDto } from 'src/interface/rest/chat/dto/create-message.dto';
import { Room } from 'src/domain/chat/entities/room';
import { User } from 'src/domain/user/entities/user';
import { MessageType } from 'src/domain/chat/value_objects/message-type';
import { GetMessagesQueryDto } from 'src/interface/rest/chat/dto/get-messages-query.dto';
import { LIMIT_PAGE } from 'src/shared/constants/const';

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
   * @param senderId
   */
  async createMessage(dto: CreateMessageDto, senderId: string | undefined): Promise<Message> {
    const message = new Message();
    message.room = Room.fromId(dto.roomId);
    message.content = dto.content;
    message.sender = senderId ? User.fromId(senderId) : null;
    message.type = dto.type ?? MessageType.TEXT;
    message.created = new Date();
    message.updated = new Date();
    message.id = await this.messageRepository.create(message);

    return message
  }

  /**
   * Lấy danh sách tin nhắn theo điều kiện
   * @param input
   */
  async getMessages(input: GetMessagesQueryDto): Promise<[Message[], number]> {
    return await this.messageRepository.getMessagesByRoomId({
      roomId: input.roomId,
      offset: (input.page - 1) * input.limit,
      limit: input.limit,
    });
  }
}
