import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from 'src/interface/rest/message/dto/create-message.dto';
import { MessageService } from 'src/application/chat/services/message.service';
import { Responder } from 'src/interface/rest/common/responder';
import { GetMessageResponse } from 'src/interface/rest/message/responses/get-message.response';
import { GetMessagesQueryDto } from 'src/interface/rest/message/dto/get-messages-query.dto';

@Controller('api/messages')
export class MessageController {
  constructor(
    protected readonly messageService: MessageService,
  ) {
  }

  /**
   * Tạo một tin nhắn mới
   * @param dto
   */
  @Post('create')
  async createMessage(@Body() dto: CreateMessageDto): Promise<any> {
    await this.messageService.createMessage(dto);
    return Responder.ok();
  }

  /**
   * Lấy danh sách tin nhắn theo điều kiện
   * @param dto
   */
  @Get()
  async getMessages(@Query() dto: GetMessagesQueryDto): Promise<any> {
    const messages = await this.messageService.getMessages(dto);
    return Responder.success(GetMessageResponse.format(messages), 'Lấy danh sách tin nhắn thành công.');
  }
}
