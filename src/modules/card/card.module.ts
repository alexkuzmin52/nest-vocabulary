import { forwardRef, Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { AuthModule } from '../auth/auth.module';

// import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Card.name,
        // name: 'flashcards',
        schema: CardSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    // CsvModule,
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
