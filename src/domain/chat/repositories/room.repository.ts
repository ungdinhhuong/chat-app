import { Room } from 'src/domain/chat/entities/room';
import { GetRoomsParams } from 'src/domain/chat/interfaces/room.interface';


export interface RoomRepository {
  create(room: Room): Promise<string>;
  findById(id: string): Promise<Room | null>;
  findByUserId(userId: string): Promise<Room[]>;
  getByUserPaginated(params: GetRoomsParams): Promise<[Room[], number]>;
}
