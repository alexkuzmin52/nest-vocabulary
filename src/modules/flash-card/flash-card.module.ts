import { forwardRef, Module } from '@nestjs/common';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashCard, flashCardSchema } from './schemas/flash-card.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlashCard.name,
        schema: flashCardSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [FlashCardController],
  providers: [FlashCardService],
})
export class FlashCardModule {}
