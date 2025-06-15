import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { REPOSITORY } from 'src/shared/constants/type';
import { AuthRepository } from 'src/domain/auth/repositories/auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { //Tham số thứ 2 của PassportStrategy có thể đặt 'jwt', nhưng đã đăng ký ở AuthModule nên không cần thiết phải đặt lại ở đây
  constructor(
    configService: ConfigService,
    @Inject(REPOSITORY.AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.authRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
