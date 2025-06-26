import { AuthUser } from 'src/domain/auth/entities/auth-user';

export interface AuthRepository {
  findByEmail(email: string): Promise<AuthUser | null>;
  findById(id: string): Promise<AuthUser | null>;
  create(authUser: AuthUser): Promise<string | null>;
  updateRefreshTokenById(id: string, token: string | null): Promise<void>;
}
