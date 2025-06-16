import { UserRepository } from 'src/domain/chat/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/infrastructure/database/schemas/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>
  ) {}
}
