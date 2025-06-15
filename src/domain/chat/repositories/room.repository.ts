import { Room } from 'src/domain/chat/entities/room.entity';
import { FindRoomsParams } from 'src/domain/chat/interfaces/room.interface';


export interface RoomRepository {
  create(room: Room): Promise<string>;
  findById(id: string): Promise<Room | null>;
  findByUserId(userId: string): Promise<Room[]>;
  getByUserPaginated(params: FindRoomsParams): Promise<[Room[], number]>;
}
