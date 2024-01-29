import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlashCardDto, IFlashCard, UpdateFlashCardDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlashCard, FlashCardType } from './schemas/flash-card.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { parse } from 'csv-parse';

@Injectable()
export class FlashCardService {
  constructor(
    @InjectModel(FlashCard.name)
    private readonly flashCardModel: Model<FlashCardType>,
  ) {}

  async createNewFlashCard(
    createFlashCardDto: CreateFlashCardDto,
    userId: string,
  ): Promise<IFlashCard> {
    const newCard = new this.flashCardModel({ ...createFlashCardDto, userId });
    return await newCard.save();
  }

  async getAllFlashCards(userId: string): Promise<IFlashCard[]> {
    return await this.flashCardModel.find({ userId }).exec();
  }

  async updateFlashCardByParam(
    flashCardId: string,
    updateFlashCardDto: UpdateFlashCardDto,
  ): Promise<IFlashCard> {
    const updatedFlashCard = await this.flashCardModel
      .findByIdAndUpdate(flashCardId, updateFlashCardDto, { new: true })
      .exec();
    if (!updatedFlashCard) {
      throw new NotFoundException(`Card with Id /${flashCardId}/ not found`);
    }
    console.log(updatedFlashCard);
    return updatedFlashCard;
  }

  async deleteFlashCardById(flashCardId: string) {
    const deletedFlashCard = await this.flashCardModel
      .findByIdAndDelete(flashCardId)
      .exec();
    if (!deletedFlashCard) {
      throw new NotFoundException(`Card with Id /${flashCardId}/ not found`);
    }
    console.log(deletedFlashCard);
    return deletedFlashCard;
  }

  async createNewFlashCardsFromCSV(id: string): Promise<IFlashCard[]> {
    // console.log(
    //   '******************** createNewFlashCardsFromCSV ********************',
    // );
    // const csvFilePath = path.resolve(__dirname, 'upload/test_vocabulary.csv');
    const csvFilePath = './upload/test-vocabulary#4.csv';
    // console.log('csvFilePath :  ', csvFilePath);

    const headers = ['front_side', 'back_side', 'topic'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    // console.log('fileContent :  ', fileContent);

    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
      },
      (error, result: CreateFlashCardDto[]) => {
        if (error) {
          console.error(error);
        }

        // console.log('Result', result);
        for (const res of result) {
          this.createNewFlashCard(res, id);
        }
      },
    );
    const addedCards = await this.flashCardModel.find({ userId: id }).exec();

    if (addedCards.length == 0) {
      throw new HttpException(
        'Nothing documents parsed',
        HttpStatus.NO_CONTENT,
      );
    }
    return addedCards;
  }

  async findFlashCardById(cardId: string): Promise<IFlashCard> {
    const cardById = await this.flashCardModel.findById(cardId).exec();
    console.log('cardById : ', cardById);
    if (!cardById) {
      throw new NotFoundException(`Card with Id /${cardId}/ not found`);
    }
    return cardById;
  }
}
