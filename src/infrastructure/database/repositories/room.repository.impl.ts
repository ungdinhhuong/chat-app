import { RoomRepository } from 'src/domain/chat/repositories/room.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomModel } from 'src/infrastructure/database/schemas/room.model';
import { Model, Types } from 'mongoose';
import { Room } from 'src/domain/chat/entities/room';
import { UserFactory } from 'src/infrastructure/factories/user.factory';
import { GetRoomsParams } from 'src/domain/chat/interfaces/room.interface';
import { Message } from 'src/domain/chat/entities/message';

@Injectable()
export class RoomRepositoryImpl implements RoomRepository {
  constructor(
    @InjectModel(RoomModel.name) private roomModel: Model<RoomModel>,
  ) {
  }

  async create(roomData: Room): Promise<string> {
    const room = new this.roomModel({
      name: roomData.name,
      members: roomData.members.map(member => new Types.ObjectId(member.id)),
      creator: new Types.ObjectId(roomData.creator.id),
      type: roomData.type,
    });

    const saved = await room.save();
    return saved.id;
  }

  async findById(roomId: string): Promise<Room | null> {
    const data = await this.roomModel.findById(roomId)
      .populate('members', 'username email')
      .populate('creator', 'username email')
      // .populate([
      //   {
      //     path: 'creator',
      //     select: ['username', 'email'],
      //   },
      //   {
      //     path: 'members',
      //     select: ['username', 'email'],
      //   },
      // ])
      // .populate([{ path: 'creator', select: ['username', 'email'] }]) // Tương tự trên
      // .populate({  // Nếu creator có ref đến một collection khác nữa
      //   path: 'creator',
      //   select: 'username email',
      //   populate: {
      //     path: 'organization',
      //     select: 'name type',
      //   }
      // })
      .lean()
      .exec();
    if (!data) return null;


    const room = new Room();
    room.id = data._id.toString();
    room.name = data.name;
    room.type = data.type;

    const creatorData = data.creator as any;
    room.creator = UserFactory.fromObject({ id: creatorData._id.toString(), username: creatorData.username });

    const membersData = data.members as any[];
    room.members = membersData.map(member => UserFactory.fromObject({
      id: member._id.toString(),
      username: member.username,
    }));

    return room;
  }

  async findByUserId(userId: string): Promise<Room[]> {
    const data = await this.roomModel.find({ members: new Types.ObjectId(userId) }).populate('members', 'username').exec();
    if (!data) return [];
    return data.map(roomData => {
      const room = new Room();
      room.id = roomData._id.toString();
      room.name = roomData.name;
      room.type = roomData.type;

      const creatorData = roomData.creator as any;
      room.creator = UserFactory.fromObject({ id: creatorData._id.toString(), username: creatorData.username });

      const membersData = roomData.members as any[];
      room.members = membersData.map(member => UserFactory.fromObject({
        id: member._id.toString(),
        username: member.username,
      }));

      return room;
    });
  }

  async getByUserPaginated(params: GetRoomsParams): Promise<[Room[], number]> {
    const query: any = {
      members: new Types.ObjectId(params.userId),
    };

    if (params.types && params.types.length > 0) {
      query.type = { $in: params.types };
    }

    const [data, total] = await Promise.all([
      this.roomModel
        .find(query)
        .skip(params.offset)
        .limit(params.limit)
        .populate('members', 'username')
        .populate('lastMessageId', 'content updatedAt')
        .sort({ updatedAt: -1 })
        .exec(),
      this.roomModel.countDocuments(query),
    ]);

    const rooms = data.map(roomData => {
      const room = new Room();
      room.id = roomData._id.toString();
      room.name = roomData.name;
      room.type = roomData.type;
      room.created = roomData.createdAt;
      room.updated = roomData.updatedAt;

      const membersData = roomData.members as any[];
      room.members = membersData.map(member => UserFactory.fromObject({
        id: member._id.toString(),
        username: member.username,
      }));

      const messageData = roomData.lastMessageId as any;
      if (messageData) {
        const message = new Message();
        message.id = messageData._id.toString();
        message.content = messageData.content;
        message.updated = messageData.updatedAt;
        room.lastMessage = message;
      }

      return room;
    })

    return [rooms, total]
  }
}
