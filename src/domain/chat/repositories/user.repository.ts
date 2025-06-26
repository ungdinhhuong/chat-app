import { UserStatus } from 'src/domain/user/value_objects/user-status';
import { User } from 'src/domain/user/entities/user';

export interface UserRepository {
  updateStatus(userId: string, status: UserStatus): Promise<void>;
  getByIds(userIds: string[]): Promise<User[]>;
  findById(userId: string): Promise<User | null>;
}
