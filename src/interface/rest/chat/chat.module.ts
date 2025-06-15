import { Module } from '@nestjs/common';
import { RoomController } from 'src/interface/rest/chat/controllers/room.controller';
import { REPOSITORY } from 'src/shared/constants/type';
import { RoomRepositoryImpl } from 'src/infrastructure/database/repositories/room.repository.impl';
import { MessageRepositoryImpl } from 'src/infrastructure/database/repositories/message.repository.impl';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository.impl';


@Module({
  controllers: [RoomController],
  providers: [
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
})
export class ChatModule {
}
