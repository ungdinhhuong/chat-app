import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/infrastructure/database/schemas/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/application/auth/services/auth.service';
import { TokenService } from 'src/application/auth/services/token.service';
import { REPOSITORY } from 'src/shared/constants/type';
import { AuthRepositoryImpl } from 'src/infrastructure/database/repositories/auth.repository.impl';
import { AuthController } from 'src/interface/rest/auth/controllers/auth.controller';
import { JwtStrategy } from 'src/interface/rest/auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
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

})
export class AuthModule {}
