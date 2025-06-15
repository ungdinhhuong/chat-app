import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/application/chat/services/message.service';
import { RedisService } from 'src/infrastructure/redis/redis.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // socketId -> userId

  constructor(
    private chatService: MessageService,
    private redisService: RedisService,
  ) {
    // Subscribe to Redis channels
    this.redisService.subscribe('chat_messages', (message) => {
      const data = JSON.parse(message);
      this.server.to(data.room).emit('newMessage', data);
    });
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Extract user info from token (implement JWT verification)
    const userId = await this.extractUserFromToken(client.handshake.auth.token);
    if (userId) {
      this.connectedUsers.set(client.id, userId);
      // await this.chatService.updateUserStatus(userId, 'online');
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const userId = this.connectedUsers.get(client.id);
    if (userId) {
      this.connectedUsers.delete(client.id);
      // await this.chatService.updateUserStatus(userId, 'offline');
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
    @MessageBody() data: { content: string; roomId: string },
  ) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) return;

    const message = await this.chatService.createMessage({
      content: data.content,
      sender: userId,
      room: data.roomId,
    });

    // Publish to Redis for scalability
    await this.redisService.publish(
      'chat_messages',
      JSON.stringify({
        room: data.roomId,
      }),
    );
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
    // Implement JWT token verification
    // Return userId if valid, null if invalid
    return null;
  }
}
