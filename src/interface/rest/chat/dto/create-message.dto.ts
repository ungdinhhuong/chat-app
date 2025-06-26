import { MessageType } from 'src/domain/chat/value_objects/message-type';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsEnum(MessageType, {
    message: `type must be one of: ${Object.values(MessageType).join(', ')}`,
  })
  type?: MessageType;
}
