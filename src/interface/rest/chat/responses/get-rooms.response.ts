import { Room } from 'src/domain/chat/entities/room';
import { TimeUtil } from 'src/infrastructure/utils/time.util';

export class GetRoomsResponse {
  static format(rooms: Room[], total: number, limit: number, page: number): GetRoomsResponse {
    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
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
        updated: !!room?.updated ? TimeUtil.formatToVN(room.updated) : null,
        lastMessage: room.lastMessage ? {
          id: room.lastMessage.id,
          content: room.lastMessage.content,
          updated: room.lastMessage.updated ? TimeUtil.formatToVN(room.lastMessage.updated) : null,
        } : null,
      })),
    }
  }
}
