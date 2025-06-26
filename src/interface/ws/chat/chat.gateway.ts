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
import { OnlineService } from 'src/application/chat/services/online.service';
import { SOCKET_EVENT } from 'src/shared/constants/socket-events';

@WebSocketGateway(socketGatewayOptions)
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: MessageService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly onlineService: OnlineService,
  ) {
  }

  async afterInit() {
    await Promise.all([
      this.redisService.subscribe(SOCKET_EVENT.CHAT_MESSAGES, (message) => {
        const parsed = JSON.parse(message);
        const data = plainToInstance(Message, parsed);
        this.server.to(data.room.id).emit(SOCKET_EVENT.NEW_MESSAGE, data);
      }),
    ]);
  }

  async handleConnection(client: Socket) {
    const userId = await this.extractUserFromToken(client.handshake.auth.token);
    if (userId) {
      await this.onlineService.addUser(userId, client.id);
      await this.userService.updateStatus(userId, UserStatus.ONLINE);
      this.server.emit(SOCKET_EVENT.ONLINE_USERS, this.onlineService.getAll());
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = this.onlineService.getUserIdBySocket(client.id);
    if (!userId) return;

    await this.onlineService.removeBySocket(client.id);
    await this.userService.updateStatus(userId, UserStatus.OFFLINE);
    this.server.emit(SOCKET_EVENT.ONLINE_USERS, this.onlineService.getAll());
  }

  @SubscribeMessage(SOCKET_EVENT.JOIN_ROOM)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    await client.join(data.roomId);
    client.emit(SOCKET_EVENT.JOINED_ROOM, { roomId: data.roomId });
  }

  @SubscribeMessage(SOCKET_EVENT.LEAVE_ROOM)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    await client.leave(data.roomId);
    client.emit(SOCKET_EVENT.LEFT_ROOM, { roomId: data.roomId });
  }

  @SubscribeMessage(SOCKET_EVENT.SEND_MESSAGE)
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: {
    content: string;
    roomId: string,
    tempId?: string
  }) {
    const userId = this.onlineService.getUserIdBySocket(client.id);
    if (!userId) return;

    const dto: CreateMessageDto = {
      content: data.content,
      roomId: data.roomId,
      type: MessageType.TEXT,
    };
    const messageCreated = await this.chatService.createMessage(dto, userId);
    client.emit(SOCKET_EVENT.SEND_MESSAGE_RESPONSE, { success: true, messageCreated, tempId: data.tempId });
    await this.redisService.publish(SOCKET_EVENT.CHAT_MESSAGES, JSON.stringify(messageCreated));
  }

  @SubscribeMessage(SOCKET_EVENT.USER_TYPING)
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; isTyping: boolean },
  ) {
    const userId = this.onlineService.getUserIdBySocket(client.id);
    if (!userId) return;

    client.to(data.roomId).emit(SOCKET_EVENT.USER_TYPING, {
      userId,
      isTyping: data.isTyping,
    });
  }

  private async extractUserFromToken(token: string): Promise<string | null> {
    return await this.tokenService.extractUserFromToken(token);
  }
}
