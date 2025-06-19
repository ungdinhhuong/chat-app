import { Message } from 'src/domain/chat/entities/message';
import { TimeUtil } from 'src/infrastructure/utils/time.util';
import { GetRoomsResponse } from 'src/interface/rest/chat/responses/get-rooms.response';

export class GetMessageResponse {
  static format(messages: Message[], total: number): GetRoomsResponse {
    return {
      total,
      items: messages.map((message) => ({
        id: message.id,
        content: message.content,
        sender: message.sender ? { id: message.sender.id, name: message.sender.username } : null,
        room: { id: message.room.id, name: message.room.name },
        type: message.type,
        is_edited: message.isEdited,
        created: message.created ? TimeUtil.formatToVN(message.created) : null,
        updated: message.updated ? TimeUtil.formatToVN(message.updated) : null,
      })),
    };
  }
}
