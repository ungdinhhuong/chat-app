import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/shared/constants/type';
import { AuthRepository } from 'src/domain/auth/repositories/auth.repository';
import { RegisterDto } from 'src/application/auth/dto/register.dto';
import { AuthUser } from 'src/domain/auth/entities/auth-user';
import * as bcrypt from 'bcryptjs';
import { AppException } from 'src/interface/rest/common/exceptions/app.exception';
import { LoginDto } from 'src/application/auth/dto/login.dto';
import { Token } from 'src/domain/auth/entities/token';
import { TokenService } from 'src/application/auth/services/token.service';
import { RefreshDto } from 'src/application/auth/dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORY.AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {
  }

  /**
   * Tạo mới tài khoản
   *
   * @param dto
   */
  async register(dto: RegisterDto): Promise<AuthUser> {
    const authUser = new AuthUser();
    authUser.username = dto.username;
    authUser.email = dto.email;
    authUser.password = await bcrypt.hash(dto.password, 10);
    const id = await this.authRepository.create(authUser);
    if (!id) {
      throw new AppException('Tạo tài khoản thất bại');
    }
    authUser.id = id;
    return authUser;
  }

  async login(dto: LoginDto): Promise<{ accessToken: Token; refreshToken: Token, authUser: AuthUser }> {
    const authUser = await this.authRepository.findByEmail(dto.email);
    if (!authUser) {
      throw new AppException('Tài khoản không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, authUser.password);
    if (!isPasswordValid) {
      throw new AppException('Mật khẩu không chính xác');
    }

    const token = await this.tokenService.generateTokens(authUser.id, authUser.email);
    const hashRefreshToken = await bcrypt.hash(token.refreshToken.id, 10);
    await this.authRepository.updateRefreshTokenById(authUser.id, hashRefreshToken);

    return {...token, authUser };
  }

  async refreshToken(dto: RefreshDto): Promise<{ accessToken: Token; refreshToken: Token }> {
    const authUser = await this.authRepository.findById(dto.userId);
    if (!authUser || !authUser.refreshToken) {
      throw new ForbiddenException("Không có quyền truy cập");
    }

    const match = await bcrypt.compare(dto.refreshToken, authUser.refreshToken);
    if (!match) {
      throw new ForbiddenException("Không có quyền truy cập");
    }

    const token = await this.tokenService.generateTokens(authUser.id, authUser.email);
    const hashRefreshToken = await bcrypt.hash(token.refreshToken.id, 10);

    await this.authRepository.updateRefreshTokenById(authUser.id, hashRefreshToken);

    return token;
  }

  /**
   * Đăng xuất người dùng
   * @param userId
   */
  async logout(userId: string): Promise<void> {
    const authUser = await this.authRepository.findById(userId);
    if (!authUser) {
      throw new AppException('Tài khoản không tồn tại');
    }
    await this.authRepository.updateRefreshTokenById(authUser.id, null);
  }

  /**
   * Lấy thông tin người dùng theo ID
   * @param userId
   */
  async getUserById(userId: string): Promise<AuthUser | null> {
    return this.authRepository.findById(userId);
  }
}
