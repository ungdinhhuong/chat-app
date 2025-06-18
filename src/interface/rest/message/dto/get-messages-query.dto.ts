import { IsEnum, IsOptional, IsString, IsInt, Min, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ChatRoomType } from 'src/domain/chat/value_objects/chat-room-type';

export class GetMessagesQueryDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

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
