import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MessageType } from 'src/domain/chat/value_objects/message-type';

@Schema({ collection: 'messages', timestamps: true })
export class MessageModel {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  sender?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'RoomModel', required: true })
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

export type MessageDocument = MessageModel & Document;
export const MessageSchema = SchemaFactory.createForClass(MessageModel);
