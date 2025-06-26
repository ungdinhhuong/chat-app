import {Inject, Injectable} from '@nestjs/common';
import {REPOSITORY} from 'src/shared/constants/type';
import {UserRepository} from 'src/domain/chat/repositories/user.repository';
import {UserStatus} from 'src/domain/user/value_objects/user-status';
import {User} from 'src/domain/user/entities/user';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository
  ) {
  }

  async updateStatus(userId: string, status: UserStatus): Promise<void> {
    await this.userRepository.updateStatus(userId, status);
  }

  async getByIds(userIds: string[]): Promise<User[]> {
    return this.userRepository.getByIds(userIds);
  }

  async findById(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
