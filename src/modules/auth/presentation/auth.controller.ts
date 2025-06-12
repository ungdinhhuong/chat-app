import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { AuthService } from 'src/modules/auth/application/services/auth.service';
import { Responder } from 'src/common/responder';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { TimeUtil } from 'src/common/utils/time.util';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { ApiPublic } from 'src/common/decorators/api-public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthUser } from 'src/modules/auth/domain/entities/auth-user';
import { RefreshDto } from 'src/modules/auth/dto/refresh.dto';
import { AppException } from 'src/common/exceptions/app.exception';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  /**
   * Tạo mới tài khoản
   * @param dto
   */
  @ApiPublic()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<any> {
    const authUser = await this.authService.register(dto);

    return Responder.success(
      {
        id: authUser.id,
        username: authUser.username,
        email: authUser.email,
      },
      'Tạo tài khoản thành công',
    );
  }

  /**
   * Người dùng đăng nhập
   * @param dto
   */
  @ApiPublic()
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<any> {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    return Responder.success(
      {
        token_type: 'Bearer',
        expires_in: accessToken.expiresIn,
        expires_at: TimeUtil.formatToVN(accessToken.expiresAt),
        access_token: accessToken.id,
        refresh_token: refreshToken.id,
      },
      'Đăng nhập thành công',
    );
  }

  @ApiPublic()
  @Post('refresh')
  async refreshToken(@Body() dto: RefreshDto): Promise<any> {
    console.log(dto);
    const { accessToken, refreshToken } = await this.authService.refreshToken(dto);
    return Responder.success(
      {
        token_type: 'Bearer',
        expires_in: accessToken.expiresIn,
        expires_at: TimeUtil.formatToVN(accessToken.expiresAt),
        access_token: accessToken.id,
        refresh_token: refreshToken.id,
      },
      'Lấy token mới thành công',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: AuthUser): Promise<any> {
    await this.authService.logout(user.id);
    return Responder.ok('Đăng xuất thành công');
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getInfo(@CurrentUser() user: AuthUser): Promise<any> {
    return Responder.success(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      'Lấy thông tin thành công',
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getByUserId(@Param('id') id: string): Promise<any> {
    const user = await this.authService.getUserById(id);
    if (!user) {
      throw new AppException('Người dùng không tồn tại');
    }
    return Responder.success(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      'Lấy thông tin thành công',
    );
  }
}
