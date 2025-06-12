import { Module } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/presentation/auth.controller';
import { AuthService } from 'src/modules/auth/application/services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { REPOSITORY } from 'src/modules/auth/type';
import { AuthRepositoryImpl } from 'src/modules/auth/infrastructure/repositories/auth.repository.impl';
import { UserModel, UserSchema } from 'src/database/schemas/user.model';
import { TokenService } from 'src/modules/auth/application/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/modules/auth/infrastructure/strategies/jwt.strategy';

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
