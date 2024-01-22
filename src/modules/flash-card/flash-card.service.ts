import { Injectable } from '@nestjs/common';
import { CreateFlashCardDto, IFlashCard, UpdateFlashCardDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlashCard, FlashCardType } from './schemas/flash-card.schema';
import { Model } from 'mongoose';
// import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';
// import * as fs from 'fs';
// import { CsvParser, ParsedData } from 'nest-csv-parser';

@Injectable()
export class FlashCardService {
  constructor(
    @InjectModel(FlashCard.name) private flashCardModel: Model<FlashCardType>,
    // private csvParser: CsvParser,
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
    console.log(updatedFlashCard);
    return updatedFlashCard;
  }

  async deleteFlashCardById(flashCardId: string) {
    const deletedFlashCard = await this.flashCardModel
      .findByIdAndDelete(flashCardId)
      .exec();
    console.log(deletedFlashCard);
    return deletedFlashCard;
  }

  // async createNewFlashCardsFromCSV(): Promise<void> {
  //   const stream = fs.createReadStream('./upload/test_vocabulary.csv');
  //   const entities: ParsedData<InstanceType<typeof CreateFlashCardDto>> =
  //     await this.csvParser.parse(stream, CreateFlashCardDto);
  //   console.log(entities);
  //   const res = JSON.stringify(entities);
  //   console.log(res);
  // }

  async createNewFlashCardsFromCSV(id: string): Promise<void> {
    console.log(
      '******************** createNewFlashCardsFromCSV ********************',
    );
    // const csvFilePath = path.resolve(__dirname, 'upload/test_vocabulary.csv');
    const csvFilePath = './upload/test_vocabulary.csv';
    console.log('csvFilePath :  ', csvFilePath);

    const headers = ['front_side', 'back_side', 'topic'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    console.log('fileContent :  ', fileContent);

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

        console.log('Result', result);
        for (const res of result) {
          this.createNewFlashCard(res, id);
        }
      },
    );
  }
}
