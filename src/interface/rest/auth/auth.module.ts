import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/application/auth/services/auth.service';
import { TokenService } from 'src/application/auth/services/token.service';
import { REPOSITORY } from 'src/shared/constants/type';
import { AuthRepositoryImpl } from 'src/infrastructure/database/repositories/auth.repository.impl';
import { AuthController } from 'src/interface/rest/auth/controllers/auth.controller';
import { JwtStrategy } from 'src/interface/rest/auth/strategies/jwt.strategy';
import { UserModule } from 'src/interface/rest/user/user.module';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.access.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.access.expiry') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    {
      provide: REPOSITORY.AuthRepository,
      useClass: AuthRepositoryImpl,
    },
  ],
  exports: [TokenService]
})
export class AuthModule {}
