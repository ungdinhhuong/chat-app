import { UserRepository } from 'src/domain/chat/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/infrastructure/database/schemas/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserStatus } from 'src/domain/user/value_objects/user-status';
import { User } from 'src/domain/user/entities/user';
import { UserFactory } from 'src/infrastructure/factories/user.factory';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
  ) {
  }

  async updateStatus(userId: string, status: UserStatus): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $set: { status } });
  }

  async getByIds(userIds: string[]): Promise<User[]> {
    const query = this.userModel.find({ _id: { $in: userIds } });
    const documents = await query.lean().exec();
    return documents.map(item => UserFactory.fromDocument(item) as User);
  }

  async findById(userId: string): Promise<User | null> {
    const document = await this.userModel.findById(userId).lean().exec();
    if(!document) {
      return null
    }
    return UserFactory.fromDocument(document) as User;
  }

}
