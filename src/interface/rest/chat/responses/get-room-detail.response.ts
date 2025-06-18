import { Room } from 'src/domain/chat/entities/room';

export class GetRoomDetailResponse {
  static format(room: Room | null) {
    if (!room) {
      return null;
    }

    return {
      id: room.id,
      name: room.name,
      type: room.type,
      members: room.members.map(member => ({
        id: member.id,
        username: member.username,
      })),
      creator: {
        id: room.creator.id,
        username: room.creator.username,
      },
    };
  }
}
