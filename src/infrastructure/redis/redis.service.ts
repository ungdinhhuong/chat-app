import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('redis.host');
    const port = this.configService.get<number>('redis.port');
    const password = this.configService.get<string>('redis.password');

    const redisOptions: RedisOptions = { host, port, password };

    this.publisher = new Redis(redisOptions);
    this.subscriber = new Redis(redisOptions);
  }

  /**
   * Publish 1 tin nhắn đến một kênh Redis
   * @param channel
   * @param message
   */
  async publish(channel: string, message: string): Promise<void> {
    await this.publisher.publish(channel, message);
  }

  /**
   * Subscribe đến một kênh Redis. Đăng ký 1 kênh cụ thể: room-123
   * @param channel
   * @param handler
   */
  async subscribe(
    channel: string,
    handler: (message: string) => void,
  ): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (receivedChannel: string, message: string) => {
      if (receivedChannel === channel) {
        handler(message);
      }
    });
  }

  async unsubscribe(channel: string): Promise<void> {
    await this.subscriber.unsubscribe(channel);
  }

  /**
   * Subscribe đến tất cả các kênh Redis theo pattern. Ví dụ: room-*, chat-*
   * @param pattern
   * @param handler
   */
  async patternSubscribe(pattern: string, handler: (channel: string, message: string) => void) {
    await this.subscriber.psubscribe(pattern);
    this.subscriber.on('pmessage', (_, channel, message) => {
      if (channel.match(pattern)) {
        handler(channel, message);
      }
    });
  }

  async patternUnsubscribe(pattern: string) {
    return this.subscriber.punsubscribe(pattern);
  }

  async disconnect() {
    this.publisher.disconnect();
    this.subscriber.disconnect();
  }

  onModuleDestroy() {
    this.disconnect().then(r => console.log('Redis disconnected'));
  }

  get client(): Redis {
    return this.publisher;
  }
}
