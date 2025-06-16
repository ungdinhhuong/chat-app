import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ChatRoomType } from 'src/domain/chat/value_objects/chat-room-type';
import { UserModel } from 'src/infrastructure/database/schemas/user.model';


@Schema({ collection: 'rooms', timestamps: true })
export class RoomModel {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: UserModel.name }]
  })
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: UserModel.name, required: true })
  creator: Types.ObjectId;

  @Prop({ enum: Object.values(ChatRoomType), default: ChatRoomType.DIRECT })
  type: ChatRoomType;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export type RoomDocument = RoomModel & Document;
export const RoomSchema = SchemaFactory.createForClass(RoomModel);
