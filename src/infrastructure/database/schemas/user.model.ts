import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserModel extends Document<string> {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'offline' })
  status: string;

  @Prop({ default: Date.now })
  lastSeen: Date;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
