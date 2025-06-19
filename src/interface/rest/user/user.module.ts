import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/infrastructure/database/schemas/user.model';
import { UserService } from 'src/application/user/user.service';
import { REPOSITORY } from 'src/shared/constants/type';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository.impl';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
    ]),
  ],
  providers: [
    UserService,
    {
      provide: REPOSITORY.UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [MongooseModule, UserService],
})
export class UserModule {
}
