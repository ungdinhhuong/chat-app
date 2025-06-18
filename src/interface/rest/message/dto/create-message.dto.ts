import { MessageType } from 'src/domain/chat/value_objects/message-type';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  room_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  sender_id: string;

  @IsOptional()
  @IsEnum(MessageType, {
    message: `type must be one of: ${Object.values(MessageType).join(', ')}`,
  })
  type?: MessageType;
}
