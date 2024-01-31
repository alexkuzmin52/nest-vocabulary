import { forwardRef, Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Card.name,
        schema: CardSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
