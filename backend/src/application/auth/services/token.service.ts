import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Token } from 'src/domain/auth/entities/token';
import { TokenFactory } from 'src/infrastructure/factories/token.factory';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
  }

  async generateTokens(userId: string): Promise<{ accessToken: Token; refreshToken: Token }> {
    const accessExpiry = this.configService.get<string>('jwt.access.expiry') ?? '900'; // 15 minutes
    const refreshExpiry = this.configService.get<string>('jwt.refresh.expiry') ?? '604800'; // 7 days

    // Payload sẽ được mã hóa, có thể chứa thông tin người dùng để xử lý logic mà không cần query db
    const accessToken = await this.jwtService.signAsync({ sub: userId , tokenType: 'access'}, {
      expiresIn: Number(accessExpiry),
    });
    const refreshToken = await this.jwtService.signAsync({ sub: userId, tokenType: 'refresh' }, {
      expiresIn: Number(refreshExpiry),
    });
    const accessTokenInstance = TokenFactory.createToken(accessToken, Number(accessExpiry));
    const refreshTokenInstance = TokenFactory.createToken(refreshToken, Number(refreshExpiry));

    return { accessToken: accessTokenInstance, refreshToken: refreshTokenInstance };
  }

  async extractPayloadToken(token: string): Promise<any> {
    if (!token) return null;
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (err) {
      console.warn('Invalid token:', err.message);
      return null;
    }
  }

  async extractUserFromToken(token: string): Promise<string | null> {
    if (!token) return null;
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload.sub || null;
    } catch (err) {
      console.warn('Invalid token:', err.message);
      return null;
    }
  }
}
