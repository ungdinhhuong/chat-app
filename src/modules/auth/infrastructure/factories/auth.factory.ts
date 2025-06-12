import { AuthUser } from 'src/modules/auth/domain/entities/auth-user';
import { UserDocument } from 'src/database/schemas/user.model';

export class AuthFactory {
  static fromDocument(document: UserDocument): AuthUser | null {
    if (!document) {
      return null;
    }

    const authUser = new AuthUser();
    authUser.id = document._id;
    authUser.username = document.username;
    authUser.email = document.email;
    authUser.password = document.password;
    authUser.refreshToken = document.refreshToken || null;

    return authUser;
  }
}
