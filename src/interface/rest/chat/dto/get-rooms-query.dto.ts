import { IsEnum, IsOptional, IsString, IsInt, Min, IsArray } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { ChatRoomType } from 'src/domain/chat/value_objects/chat-room-type';

export class GetRoomsQueryDto {
  @Expose({ name: 'user_id' })
  @IsString()
  userId: string;

  @IsOptional()
  @IsArray()
  @IsEnum(ChatRoomType, { each: true })
  @Type(() => String)
  types?: ChatRoomType[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}
