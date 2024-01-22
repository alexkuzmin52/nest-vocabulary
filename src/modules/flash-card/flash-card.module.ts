import { forwardRef, Module } from '@nestjs/common';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashCard, flashCardSchema } from './schemas/flash-card.schema';
import { AuthModule } from '../auth/auth.module';
// import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlashCard.name,
        schema: flashCardSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    // CsvModule,
  ],
  controllers: [FlashCardController],
  providers: [FlashCardService],
})
export class FlashCardModule {}
