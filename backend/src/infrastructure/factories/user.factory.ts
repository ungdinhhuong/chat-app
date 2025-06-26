import { UserDocument } from 'src/infrastructure/database/schemas/user.model';
import { User } from 'src/domain/user/entities/user';

export class UserFactory {
  static fromObject(obj: {
    id: string;
    username?: string;
    email?: string;
  }): User {
    const user = new User();
    user.id = obj.id;
    user.username = obj.username;
    user.email = obj.email;
    return user;
  }

  static fromDocument(document: UserDocument): User | null {
    if (!document) {
      return null;
    }

    const user = new User();
    user.id = document._id;
    user.username = document.username;
    user.email = document.email;

    return user;
  }
}
