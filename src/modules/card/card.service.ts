import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto, ICard, UpdateCardDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardType } from './schemas/card.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import * as path from 'path';
import * as process from 'process';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name)
    private readonly CardModel: Model<CardType>,
  ) {}

  async createNewCard(
    createCardDto: CreateCardDto,
    userId: string,
  ): Promise<ICard> {
    const newCard = new this.CardModel({ ...createCardDto, userId });
    return await newCard.save();
  }

  async getAllCards(userId: string): Promise<ICard[]> {
    return await this.CardModel.find({ userId }).exec();
  }

  async updateCardByParam(
    CardId: string,
    updateCardDto: UpdateCardDto,
  ): Promise<ICard> {
    const updatedCard = await this.CardModel.findByIdAndUpdate(
      CardId,
      updateCardDto,
      { new: true },
    ).exec();
    if (!updatedCard) {
      throw new NotFoundException(`Card with Id /${CardId}/ not found`);
    }
    console.log(updatedCard);
    return updatedCard;
  }

  async deleteCardById(CardId: string) {
    const deletedCard = await this.CardModel.findByIdAndDelete(CardId).exec();
    if (!deletedCard) {
      throw new NotFoundException(`Card with Id /${CardId}/ not found`);
    }
    console.log(deletedCard);
    return deletedCard;
  }

  async createNewCardsFromCSV(id: string, file_name: string): Promise<ICard[]> {
    console.log(
      '******************** createNewCardsFromCSV ********************',
    );
    const csvFilePath = path.resolve(process.cwd(), `upload/${file_name}`);
    console.log('csvFilePath :  ', csvFilePath);

    const headers = ['front_side', 'back_side', 'topic'];

    // *************************************************************
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    console.log('pars');
    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
      },
      (error, result: CreateCardDto[]) => {
        if (error) {
          console.error(error);
        }

        for (const res of result) {
          this.createNewCard(res, id);
        }
      },
    );
    console.log('addedCards');
    const addedCards = await this.CardModel.find({ userId: id }).exec();
    console.log(addedCards);
    if (addedCards.length == 0) {
      throw new HttpException(
        'Nothing documents parsed',
        HttpStatus.NO_CONTENT,
      );
    }
    return addedCards;
    // *****************************************************
  }

  async findCardById(cardId: string): Promise<ICard> {
    const cardById = await this.CardModel.findById(cardId).exec();
    console.log('cardById : ', cardById);
    if (!cardById) {
      throw new NotFoundException(`Card with Id /${cardId}/ not found`);
    }
    return cardById;
  }
}
