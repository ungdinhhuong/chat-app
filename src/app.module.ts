import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './modules/redis/redis.module';
import { SharedModule } from './modules/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { MongodbConfig } from 'src/config/mongodb.config';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    SharedModule,
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
