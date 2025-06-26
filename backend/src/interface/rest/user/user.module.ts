import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/infrastructure/database/schemas/user.model';
import { UserService } from 'src/application/user/user.service';
import { REPOSITORY } from 'src/shared/constants/type';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository.impl';
import { UserController } from 'src/interface/rest/user/controllers/user.controller';
import { OnlineService } from 'src/application/chat/services/online.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
    ]),
  ],
  providers: [
    UserService,
    OnlineService,
    {
      provide: REPOSITORY.UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  controllers: [UserController],
  exports: [MongooseModule, UserService],
})
export class UserModule {
}
