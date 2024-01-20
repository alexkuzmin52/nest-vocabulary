import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FlashCardService } from './flash-card.service';
import { CreateFlashCardDto, IFlashCard } from './dto';
import { UserRoleGuard } from '../../decorators/user-role.guard';
import { UserId } from '../../decorators/user-id.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoleEnum } from '../../constants';

@ApiTags('Flash cards')
@ApiSecurity('access-key')
@Roles(UserRoleEnum.ADMIN)
@UseGuards(UserRoleGuard)
@Controller('flash-card')
export class FlashCardController {
  constructor(private flashCardService: FlashCardService) {}
  // @ApiSecurity('access-key')
  @Roles(UserRoleEnum.USER)
  @Post('')
  @ApiOperation({ summary: 'Create a new card' })
  async createFlashCard(
    @Body() createFlashCardDto: CreateFlashCardDto,
    @UserId() userId: string,
  ): Promise<IFlashCard> {
    // console.log(userId);
    return await this.flashCardService.createNewFlashCard(
      createFlashCardDto,
      userId,
    );
  }
  // @ApiSecurity('access-key')
  // @UseGuards(UserRoleGuard)
  @Get('')
  // @Roles(UserRoleEnum.USER)
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
