import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/database/schemas/message.model';
import { Room } from 'src/database/schemas/room.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Room.name) private roomModel: Model<Room>,
    // @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createMessage(messageData: any): Promise<Message> {
    const message = new this.messageModel(messageData);
    return await message.save();
  }

  async getMessages(roomId: string, page = 1, limit = 50): Promise<Message[]> {
    return await this.messageModel
      .find({ room: roomId })
      .populate('sender', 'username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  async createRoom(roomData: any): Promise<Room> {
    const room = new this.roomModel(roomData);
    return await room.save();
  }

  async getRooms(userId: string): Promise<Room[]> {
    return await this.roomModel
      .find({ members: userId })
      .populate('members', 'username status')
      .exec();
  }

  async updateUserStatus(userId: string, status: string): Promise<void> {
    // await this.userModel.findByIdAndUpdate(userId, {
    //   status,
    //   lastSeen: new Date(),
    // });
  }
}
