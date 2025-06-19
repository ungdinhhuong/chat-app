import { Controller, ForbiddenException, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RoomService } from 'src/application/chat/services/room.service';
import { GetRoomsQueryDto } from 'src/interface/rest/chat/dto/get-rooms-query.dto';
import { CurrentUser } from 'src/interface/rest/common/decorators/current-user.decorator';
import { AuthUser } from 'src/domain/auth/entities/auth-user';
import { Responder } from 'src/interface/rest/common/responder';
import { JwtAuthGuard } from 'src/interface/rest/auth/guards/jwt-auth.guard';
import { GetRoomsResponse } from 'src/interface/rest/chat/responses/get-rooms.response';
import { GetRoomDetailResponse } from 'src/interface/rest/chat/responses/get-room-detail.response';
import { LIMIT_PAGE } from 'src/shared/constants/const';

@Controller('api/rooms')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {
  }

  @Post('create')
  async createRoom(@CurrentUser() user: AuthUser) {
    const room = await this.roomService.createRoom({
      name: 'Phòng chat của ' + user.username,
      memberIds: [user.id],
      creatorId: user.id,
    });

    return Responder.success({
      id: room.id,
    }, 'Phòng chat đã được tạo thành công.');
  }

  @Get('/')
  async getRooms(@CurrentUser() user: AuthUser, @Query() query: GetRoomsQueryDto) {
    if (!user.isAdmin && user.id !== query.user_id) {
      throw new ForbiddenException('Bạn không có quyền lấy danh sách phòng.');
    }

    const [rooms, total] = await this.roomService.getRoomsByUser(query);

    return Responder.success(GetRoomsResponse.format(rooms, total, query.page, query.limit), 'Lấy danh sách phòng chat thành công.');
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    const room = await this.roomService.getRoomById(id);

    return Responder.success(GetRoomDetailResponse.format(room), 'Lấy thông tin phòng chat thành công.');
  }
}
