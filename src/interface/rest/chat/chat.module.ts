import { Global, Module } from '@nestjs/common';
import { RoomController } from 'src/interface/rest/chat/controllers/room.controller';
import { REPOSITORY } from 'src/shared/constants/type';
import { RoomRepositoryImpl } from 'src/infrastructure/database/repositories/room.repository.impl';
import { MessageRepositoryImpl } from 'src/infrastructure/database/repositories/message.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModel, RoomSchema } from 'src/infrastructure/database/schemas/room.model';
import { MessageModel, MessageSchema } from 'src/infrastructure/database/schemas/message.model';
import { RoomService } from 'src/application/chat/services/room.service';
import { MessageService } from 'src/application/chat/services/message.service';
import { MessageController } from 'src/interface/rest/chat/controllers/message.controller';
import { ChatGateway } from 'src/interface/ws/chat/chat.gateway';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { OnlineService } from 'src/application/chat/services/online.service';

@Module({
  imports: [
    RedisModule,
    MongooseModule.forFeature([
      { name: RoomModel.name, schema: RoomSchema },
      { name: MessageModel.name, schema: MessageSchema },
    ]),
  ],
  controllers: [RoomController, MessageController],
  providers: [
    RoomService,
    MessageService,
    OnlineService,
    ChatGateway,
    {
      provide: REPOSITORY.RoomRepository,
      useClass: RoomRepositoryImpl,
    },
    {
      provide: REPOSITORY.MessageRepository,
      useClass: MessageRepositoryImpl,
    },

  ],
  exports:[MongooseModule, OnlineService]
})
export class ChatModule {
}
