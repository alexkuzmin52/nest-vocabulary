import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { IAuth } from '../dto';

export type AuthType = IAuth & Document;

@Schema({ timestamps: true })
export class Auth {
  @Prop()
  access_token: string;
  @Prop()
  refresh_token: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;
}

export const authSchema = SchemaFactory.createForClass(Auth);
