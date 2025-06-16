import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/infrastructure/config/configuration';
import { MongodbConfig } from 'src/infrastructure/config/mongodb.config';
import { AuthModule } from 'src/interface/rest/auth/auth.module';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { ChatModule } from 'src/interface/rest/chat/chat.module';
import { UserModule } from './interface/rest/user/user.module';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    ChatModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => new MongodbConfig(configService).dbDefault,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
