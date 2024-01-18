import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoleEnum } from '../../../constants';
import { UserStatusEnum } from '../../../constants';
import { Document } from 'mongoose';
import { IUser } from '../dto';

export type UserType = IUser & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  // surname?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: string;

  // age?: number;
  // phone?: string;
  // gender?: string;
  // photo?: string;

  @Prop({
    required: true,
    enum: UserStatusEnum,
    default: UserStatusEnum.PENDING,
  })
  status: string;

  // @Prop({ default: null })
  // token: string;

  @Prop()
  createdAt: string;
}

export const userSchema = SchemaFactory.createForClass(User);
