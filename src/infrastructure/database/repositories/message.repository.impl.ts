import { MessageRepository } from 'src/domain/chat/repositories/message.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageModel } from 'src/infrastructure/database/schemas/message.model';
import { Model, Types } from 'mongoose';
import { Message } from 'src/domain/chat/entities/message';
import { Room } from 'src/domain/chat/entities/room';
import { User } from 'src/domain/user/entities/user';
import { GetMessageParams } from 'src/domain/chat/interfaces/message.interface';

@Injectable()
export class MessageRepositoryImpl implements MessageRepository {
  constructor(
    @InjectModel(MessageModel.name) private messageModel: Model<MessageModel>,
  ) {
  }

  async create(messageData: Message): Promise<string> {
    const message = new this.messageModel({
      content: messageData.content,
      room: messageData.room ? new Types.ObjectId(messageData.room.id) : null,
      sender: messageData.sender ? messageData.sender.id : null,
      createdAt: messageData.created || new Date(),
      updatedAt: messageData.updated || new Date(),
    });
    const saved = await message.save();
    return saved.id;
  }

  async getMessagesByRoomId(params: GetMessageParams): Promise<[Message[], number]> {
    const query: any = {
      room: new Types.ObjectId(params.roomId),
    };
    const [data, total] = await Promise.all([
      this.messageModel
        .find(query)
        .skip(params.offset)
        .limit(params.limit)
        .sort({ updatedAt: -1 })
        .lean()
        .exec(),
      this.messageModel.countDocuments(query),
    ]);

    const messages = data.map((item) => {
      const message = new Message();
      message.id = item._id.toString();
      message.content = item.content;
      message.room = Room.fromId(item.room.toString());
      message.sender = item.sender ? User.fromId(item.sender._id.toString()) : null;
      message.type = item.type;
      message.isEdited = item.isEdited;
      message.created = item.createdAt;
      message.updated = item.updatedAt;
      return message;
    });

    return [messages, total];
  }
}
