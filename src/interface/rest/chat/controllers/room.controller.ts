import { Controller, ForbiddenException, Get, Param, Query } from '@nestjs/common';
import { RoomService } from 'src/application/chat/services/room.service';
import { GetRoomsQueryDto } from 'src/interface/rest/chat/dto/get-rooms-query.dto';
import { CurrentUser } from 'src/interface/rest/common/decorators/current-user.decorator';
import { AuthUser } from 'src/domain/auth/entities/auth-user';
import { ChatRoomType } from 'src/domain/chat/value_objects/chat-room-type';
import { Responder } from 'src/interface/rest/common/responder';

@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {
  }

  @Get(':id')
  async getRooms(@CurrentUser() user: AuthUser, @Query() query: GetRoomsQueryDto) {
    if (!user.isAdmin && user.id !== query.userId) {
      throw new ForbiddenException('Bạn không có quyền lấy danh sách phòng.');
    }
    const [rooms, total] = await this.roomService.getRoomsByUser(query);

    return Responder.success({
      total,
      items: rooms.map(room => ({
        id: room.id,
        name: room.name,
        type: ChatRoomType,
        members: room.members.map(member => ({
          id: member.id,
          username: member.username,
          email: member.email,
        })),
        creator: {
          id: room.creator.id,
          username: room.creator.username,
          email: room.creator.email,
        },
      })),
    });
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    return Responder.success(this.roomService.getRoomById(id));
  }
}
