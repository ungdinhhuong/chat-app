import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { LIMIT_PAGE } from 'src/shared/constants/const';

export class GetMessagesQueryDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = LIMIT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;
}
