import { Token } from 'src/modules/auth/domain/entities/token';
import { TimeUtil } from 'src/common/utils/time.util';

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
