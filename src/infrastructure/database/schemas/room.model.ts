import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RoomType } from 'src/domain/chat/value_objects/room-type';

@Schema({ collection: 'rooms', timestamps: true })
export class RoomModel {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'UserModel' }],
  })
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  creator: Types.ObjectId;

  @Prop({ enum: Object.values(RoomType), default: RoomType.DIRECT })
  type: RoomType;

  @Prop({ type: Types.ObjectId, ref: 'MessageModel' })
  lastMessageId?: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export type RoomDocument = RoomModel & Document;
export const RoomSchema = SchemaFactory.createForClass(RoomModel);
