import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from 'src/application/user/user.service';
import { JwtAuthGuard } from 'src/interface/rest/auth/guards/jwt-auth.guard';
import { OnlineService } from 'src/application/chat/services/online.service';
import { Responder } from 'src/interface/rest/common/responder';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly onlineService: OnlineService,
  ) {
  }

  @Get('online')
  @UseGuards(JwtAuthGuard)
  async getUserOnline(): Promise<any> {
    const onlineUserIds = await this.onlineService.getAll();
    const users = await this.userService.getByIds(onlineUserIds);
    return Responder.success(
      users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
      })),
      'Lấy thông tin thành công',
    );
  }
}
