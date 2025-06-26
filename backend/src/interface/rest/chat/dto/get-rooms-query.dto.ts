import { IsEnum, IsOptional, IsString, IsInt, Min, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomType } from 'src/domain/chat/value_objects/room-type';

export class GetRoomsQueryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsArray()
  @IsEnum(RoomType, { each: true })
  @Type(() => String)
  types?: RoomType[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;
}
