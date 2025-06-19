import { UserRepository } from 'src/domain/chat/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/infrastructure/database/schemas/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserStatus } from 'src/domain/user/value_objects/user-status';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
  ) {
  }

  async updateStatus(userId: string, status: UserStatus): Promise<void> {
    await this.userModel.updateOne({_id: userId}, {$set: {status}})
  }
}
