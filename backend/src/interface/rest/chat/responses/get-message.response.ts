import { Message } from 'src/domain/chat/entities/message';

export class GetMessageResponse {
  static format(messages: Message[], total: number, limit: number, page: number): GetMessageResponse {
    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      items: messages.map((message) => ({
        id: message.id,
        content: message.content,
        sender: message.sender ? { id: message.sender.id, username: message.sender.username } : null,
        room: { id: message.room.id, name: message.room.name },
        type: message.type,
        isEdited: message.isEdited,
        created: message.created,
        updated: message.updated,
      })),
    };
  }
}
