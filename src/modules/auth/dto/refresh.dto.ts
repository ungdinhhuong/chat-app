import { IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class RefreshDto {
  @IsString()
  @Expose({ name: 'user_id' })
  @Transform(({ value }) => value)
  userId: string;

  @IsString()
  @Expose({ name: 'refresh_token' })
  @Transform(({ value }) => value)
  refreshToken: string;
}
