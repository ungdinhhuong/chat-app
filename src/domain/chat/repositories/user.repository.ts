import { UserStatus } from 'src/domain/user/value_objects/user-status';

export interface UserRepository {
  updateStatus(userId: string, status: UserStatus): Promise<void>;
}
