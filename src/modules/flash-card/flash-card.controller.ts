import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FlashCardService } from './flash-card.service';
import { CreateFlashCardDto } from './dto';
import { IFlashCard } from './dto';
import { UserRoleGuard } from '../../decorators/user-role.guard';
import { UserId } from '../../decorators/user-id.decorator';

@ApiTags('Flash cards')
@Controller('flash-card')
export class FlashCardController {
  constructor(private flashCardService: FlashCardService) {}
  @ApiSecurity('access-key')
  @Post('')
  @ApiOperation({ summary: 'Create a new card' })
  async createFlashCard(
    @Body() createFlashCardDto: CreateFlashCardDto,
    @UserId() userId: string,
  ): Promise<IFlashCard> {
    console.log(userId);
    return await this.flashCardService.createNewFlashCard(
      createFlashCardDto,
      userId,
    );
  }
  @ApiSecurity('access-key')
  @UseGuards(UserRoleGuard)
  @Get('')
  @ApiOperation({ summary: 'Get all flash card' })
  async getFlashCards(@UserId() userId: string): Promise<IFlashCard[]> {
    return await this.flashCardService.getAllFlashCards(userId);
  }

  // @Put('')
  // @ApiOperation({ summary: 'Update flash card' })
  // async updateFlashCard(
  //   @Body() updateFlashCardDto: UpdateFlashCardDto,
  // ): Promise<IFlashCard> {
  //   return await this.flashCardService.updateFlashCardByParam(
  //     updateFlashCardDto,
  //   );
  // }
}
