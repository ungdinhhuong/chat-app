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

  async generateTokens(userId: string, email: string): Promise<{ accessToken: Token; refreshToken: Token }> {
    const accessExpiry = this.configService.get<string>('jwt.access.expiry') ?? '900'; // 15 minutes
    const refreshExpiry = this.configService.get<string>('jwt.refresh.expiry') ?? '604800'; // 7 days

    const payload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: Number(accessExpiry),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: Number(refreshExpiry),
    });
    const accessTokenInstance = TokenFactory.createToken(accessToken, Number(accessExpiry));
    const refreshTokenInstance = TokenFactory.createToken(refreshToken, Number(refreshExpiry));

    return { accessToken: accessTokenInstance, refreshToken: refreshTokenInstance };
  }
}
