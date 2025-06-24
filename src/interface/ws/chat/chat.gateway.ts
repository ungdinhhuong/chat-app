import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/application/chat/services/message.service';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { UserStatus } from 'src/domain/user/value_objects/user-status';
import { UserService } from 'src/application/user/user.service';
import { MessageType } from 'src/domain/chat/value_objects/message-type';
import { TokenService } from 'src/application/auth/services/token.service';
import { socketGatewayOptions } from 'src/infrastructure/config/socket.config';
import { Message } from 'src/domain/chat/entities/message';
import { plainToInstance } from 'class-transformer';
import { CreateMessageDto } from 'src/interface/rest/chat/dto/create-message.dto';

@WebSocketGateway(socketGatewayOptions)
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // socketId -> userId

  constructor(
    private readonly chatService: MessageService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
  }

  async afterInit() {
    await Promise.all([
      this.redisService.subscribe('chat_messages', (message) => {
        const parsed = JSON.parse(message);
        const data = plainToInstance(Message, parsed);
        this.server.to(data.room.id).emit('newMessage', data);
      }),
    ]);
  }

  async handleConnection(client: Socket) {
    const userId = await this.extractUserFromToken(client.handshake.auth.token);
    if (userId) {
      this.connectedUsers.set(client.id, userId);
      await this.userService.updateStatus(userId, UserStatus.ONLINE);
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      this.connectedUsers.delete(client.id);
      await this.userService.updateStatus(userId, UserStatus.OFFLINE);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    await client.join(data.roomId);
    client.emit('joinedRoom', { roomId: data.roomId });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    await client.leave(data.roomId);
    client.emit('leftRoom', { roomId: data.roomId });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { content: string; roomId: string , tempId?: string }
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;
    const dto: CreateMessageDto = {
      content: data.content,
      roomId: data.roomId,
      type: MessageType.TEXT,
    };
    const messageCreated = await this.chatService.createMessage(dto, userId);
    client.emit('sendMessageResponse', { success: true, messageCreated, tempId: data.tempId });
    await this.redisService.publish('chat_messages', JSON.stringify(messageCreated));
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; isTyping: boolean },
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;

    client.to(data.roomId).emit('userTyping', {
      userId,
      isTyping: data.isTyping,
    });
  }

  private async extractUserFromToken(token: string): Promise<string | null> {
    return await this.tokenService.extractUserFromToken(token);
  }
}
