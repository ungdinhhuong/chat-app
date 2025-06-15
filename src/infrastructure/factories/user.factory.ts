import { User } from 'src/domain/user/entities/User';

export class UserFactory {
  static fromObject(obj: {
    id: string;
    username?: string;
    email? : string;
  }): User {
    const user = new User();
    user.id = obj.id;
    user.username = obj.username;
    user.email = obj.email;
    return user;
  }
}
