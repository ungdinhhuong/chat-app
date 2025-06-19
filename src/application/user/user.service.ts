import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/shared/constants/type';
import { UserRepository } from 'src/domain/chat/repositories/user.repository';
import { UserStatus } from 'src/domain/user/value_objects/user-status';

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
}
