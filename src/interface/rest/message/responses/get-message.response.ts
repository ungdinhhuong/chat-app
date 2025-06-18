import { Message } from 'src/domain/chat/entities/message';
import { TimeUtil } from 'src/infrastructure/utils/time.util';

export class GetMessageResponse {
  static format(messages: Message[]) {
    return messages.map((message) => ({
      id: message.id,
      content: message.content,
      sender: message.sender ? { id: message.sender.id, name: message.sender.username } : null,
      room: { id: message.room.id, name: message.room.name },
      type: message.type,
      isEdited: message.isEdited,
      created: TimeUtil.formatToVN(message.created),
      updated: TimeUtil.formatToVN(message.updated),
    }));
  }
}
