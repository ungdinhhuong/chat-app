import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from 'src/interface/rest/message/dto/create-message.dto';
import { MessageService } from 'src/application/chat/services/message.service';
import { Responder } from 'src/interface/rest/common/responder';
import { GetMessageResponse } from 'src/interface/rest/message/responses/get-message.response';
import { GetMessagesQueryDto } from 'src/interface/rest/message/dto/get-messages-query.dto';
import { CurrentUser } from 'src/interface/rest/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/interface/rest/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/domain/auth/entities/auth-user';

@Controller('api/messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(
    protected readonly messageService: MessageService,
  ) {
  }

  /**
   * Tạo một tin nhắn mới
   * @param user
   * @param dto
   */
  @Post('create')
  async createMessage(@CurrentUser() user: AuthUser, @Body() dto: CreateMessageDto): Promise<any> {
    await this.messageService.createMessage(dto, user.id);
    return Responder.ok();
  }

  /**
   * Lấy danh sách tin nhắn theo điều kiện
   * @param dto
   */
  @Get()
  async getMessages(@Query() dto: GetMessagesQueryDto): Promise<any> {
    // Kiểm tra user có quyền truy cập vào phòng hay không

    const [messages, total] = await this.messageService.getMessages(dto);
    return Responder.success(GetMessageResponse.format(messages, total), 'Lấy danh sách tin nhắn thành công.');
  }
}
