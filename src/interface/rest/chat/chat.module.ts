import { Module } from '@nestjs/common';
import { RoomController } from 'src/interface/rest/chat/controllers/room.controller';
import { REPOSITORY } from 'src/shared/constants/type';
import { RoomRepositoryImpl } from 'src/infrastructure/database/repositories/room.repository.impl';
import { MessageRepositoryImpl } from 'src/infrastructure/database/repositories/message.repository.impl';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModel, RoomSchema } from 'src/infrastructure/database/schemas/room.model';
import { MessageModel, MessageSchema } from 'src/infrastructure/database/schemas/message.model';
import { UserModule } from 'src/interface/rest/user/user.module';
import { RoomService } from 'src/application/chat/services/room.service';


@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: RoomModel.name, schema: RoomSchema },
      { name: MessageModel.name, schema: MessageSchema },
    ]),
  ],
  controllers: [RoomController],
  providers: [
    RoomService,
    {
      provide: REPOSITORY.RoomRepository,
      useClass: RoomRepositoryImpl,
    },
    {
      provide: REPOSITORY.MessageRepository,
      useClass: MessageRepositoryImpl,
    },
    {
      provide: REPOSITORY.UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports:[MongooseModule]
})
export class ChatModule {
}
