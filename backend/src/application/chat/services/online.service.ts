import { RedisService } from 'src/infrastructure/redis/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OnlineService {
  private socketUserMap = new Map<string, string>(); // socketId -> userId
  private readonly onlineKey = 'online_users';

  constructor(private redis: RedisService) {
  }

  async addUser(userId: string, socketId: string) {
    this.socketUserMap.set(socketId, userId);
    await this.redis.client.sadd(this.onlineKey, userId);
  }

  async removeBySocket(socketId: string): Promise<string | undefined> {
    const userId = this.socketUserMap.get(socketId);
    if (userId) {
      await this.redis.client.srem(this.onlineKey, userId);
      this.socketUserMap.delete(socketId);
    }
    return userId;
  }

  async getAll(): Promise<string[]> {
    return this.redis.client.smembers(this.onlineKey);
  }

  getUserIdBySocket(socketId: string): string | undefined {
    return this.socketUserMap.get(socketId);
  }
}
