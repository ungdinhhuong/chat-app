import { Room } from 'src/domain/chat/entities/room';
import { TimeUtil } from 'src/infrastructure/utils/time.util';

export class GetRoomsResponse {
  static format(rooms: Room[], total: number, page: number, limit: number): GetRoomsResponse {
    return {
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
      items: rooms.map(room => ({
        id: room.id,
        name: room.name,
        type: room.type,
        members: room.members.map(member => ({
          id: member.id,
          username: member.username,
          email: member.email,
        })),
        updatedAt: !!room?.updatedAt ? TimeUtil.formatToVN(room.updatedAt) : null,
      })),
    }
  }
}
