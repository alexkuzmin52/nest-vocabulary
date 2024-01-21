import { Injectable } from '@nestjs/common';
import { CreateFlashCardDto, IFlashCard, UpdateFlashCardDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlashCard, FlashCardType } from './schemas/flash-card.schema';
import { Model } from 'mongoose';

@Injectable()
export class FlashCardService {
  constructor(
    @InjectModel(FlashCard.name) private flashCardModel: Model<FlashCardType>,
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
}
