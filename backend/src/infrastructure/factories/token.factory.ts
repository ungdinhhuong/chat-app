import { TimeUtil } from 'src/infrastructure/utils/time.util';
import { Token } from 'src/domain/auth/entities/token';

export class TokenFactory {
  static createToken(id: string, expiryIn: number): Token {
    const token = new Token();
    token.id = id;
    token.expiresAt = TimeUtil.nowVN().add(expiryIn, 'seconds').toDate();
    token.expiresIn = expiryIn;
    token.isActive = true;
    return token;
  }
}
