import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MessageType } from 'src/domain/chat/value_objects/message-type';
import { RoomModel } from 'src/infrastructure/database/schemas/room.model';
import { UserModel } from 'src/infrastructure/database/schemas/user.model';

@Schema({ collection: 'messages', timestamps: true })
export class MessageModel extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: UserModel.name, required: true })
  sender?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: RoomModel.name, required: true })
  room: Types.ObjectId;

  @Prop({ enum: Object.values(MessageType), default: MessageType.TEXT })
  type: MessageType;

  @Prop({ default: false })
  isEdited: boolean;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
