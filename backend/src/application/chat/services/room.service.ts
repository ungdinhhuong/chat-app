import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/shared/constants/type';
import { RoomRepository } from 'src/domain/chat/repositories/room.repository';
import { Room } from 'src/domain/chat/entities/room';
import { GetRoomsQueryDto } from 'src/interface/rest/chat/dto/get-rooms-query.dto';
import { LIMIT_PAGE } from 'src/shared/constants/const';
import { User } from 'src/domain/user/entities/user';

@Injectable()
export class RoomService {
  constructor(
    @Inject(REPOSITORY.RoomRepository)
    private readonly roomRepository: RoomRepository,
  ) {
  }

  /**
   * Tạo một phòng chat mới
   * @param roomData
   */
  async createRoom(roomData: {
    name: string,
    memberIds: string[],
    creatorId: string,
  }): Promise<Room> {
    const room = new Room();
    room.name = roomData.name;
    room.members = roomData.memberIds.map((id: string) => User.fromId(id));
    room.creator = User.fromId(roomData.creatorId);
    room.id = await this.roomRepository.create(room);

    return room;
  }

  /**
   * Lấy thông tin phòng chat của người dùng
   * @param input
   */
  async getRoomsByUser(input: GetRoomsQueryDto): Promise<[Room[], number]> {
    return await this.roomRepository.getByUserPaginated({
      userId: input.userId,
      types: input.types,
      offset: (input.page - 1) * input.limit,
      limit: input.limit,
    });
  }

  /**
   * Lấy thông tin phòng chat theo ID
   * @param id
   */
  async getRoomById(id: string): Promise<Room | null> {
    return await this.roomRepository.findById(id);
  }
}
