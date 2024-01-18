import { IFlashCard } from '../dto';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FlashCardType = IFlashCard & Document;

@Schema({ timestamps: true })
export class FlashCard {
  @ApiProperty({
    description: 'Reference to the owner ID of this flash-card.',
  })
  @Prop({
    required: false,
    default: null,
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'This is the word/expression that needs to be translated',
  })
  @Prop({ required: true })
  front_side: string;

  @ApiProperty({
    description:
      'This is the translation of the word/expression that is on the front side.',
  })
  @Prop({ required: true })
  back_side: string;

  @ApiProperty({ description: 'The current level' })
  @Prop({ required: false, default: 1 })
  level: number;

  @ApiProperty({ description: 'Repetition counter' })
  @Prop({ required: false, default: 0 })
  counter: number;

  @ApiProperty({ description: 'Failure counter' })
  @Prop({ required: false, default: 0 })
  failed: number;

  @ApiProperty({ description: 'Dictionary section' })
  @Prop({ required: false, default: '' })
  topic: string;
}
export const flashCardSchema = SchemaFactory.createForClass(FlashCard);
