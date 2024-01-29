import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FlashCardService } from './flash-card.service';
import { CreateFlashCardDto, IFlashCard, UpdateFlashCardDto } from './dto';
import { UserRoleGuard } from '../../decorators/user-role.guard';
import { UserId } from '../../decorators/user-id.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoleEnum } from '../../constants';
import { FlashCard } from './schemas/flash-card.schema';

@ApiTags('Flash cards')
@ApiSecurity('access-key')
@UseGuards(UserRoleGuard)
@Controller('flash-card')
export class FlashCardController {
  constructor(private readonly flashCardService: FlashCardService) {}

  @Roles(UserRoleEnum.USER)
  @Post('')
  @ApiOperation({ summary: 'Create a new card' })
  @ApiCreatedResponse({
    type: FlashCard,
    description: 'Card created successful',
  })
  // @ApiBody({type: CreateFlashCardDto})
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

  @ApiOperation({ summary: 'Get all cards' })
  @ApiOkResponse({ type: [FlashCard], description: 'All vocabulary cards' })
  @Roles(UserRoleEnum.USER)
  @Get('')
  // @Roles(UserRoleEnum.USER)
  async getFlashCards(@UserId() userId: string): Promise<IFlashCard[]> {
    return await this.flashCardService.getAllFlashCards(userId);
  }

  @ApiOperation({ summary: 'Find card with a specific ID' })
  @ApiOkResponse({
    type: FlashCard,
    description: 'Found card with a specific ID',
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Get(':id')
  async getFlashCard(@Param('id') cardId:string):Promise<IFlashCard> {
    return await this.flashCardService.findFlashCardById(cardId);
  }

  @ApiOperation({ summary: 'Find cards by filter ' })
  @ApiOkResponse({
    type: [FlashCard],
    description: 'Found cards by filter',
  })
  // @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Get('query')



  @ApiOperation({ summary: 'Update card' })
  @ApiOkResponse({
    type: FlashCard,
    description: 'Updated card with a specific ID',
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Put('/:id')
  async updateFlashCard(
    @Param('id') flashCardId: string,
    @Body() updateFlashCardDto: UpdateFlashCardDto,
  ): Promise<IFlashCard> {
    return await this.flashCardService.updateFlashCardByParam(
      flashCardId,
      updateFlashCardDto,
    );
  }

  @ApiOperation({ summary: 'Remove card' })
  @ApiOkResponse({ type: FlashCard, description: 'Deleted card' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Delete('/:id')
  async deleteFlashCard(@Param('id') flashCardId: string): Promise<IFlashCard> {
    return await this.flashCardService.deleteFlashCardById(flashCardId);
  }

  @ApiOperation({ summary: 'Upload cards from CSV file' })
  @ApiCreatedResponse({
    type: [FlashCard],
    description: 'Cards created successful',
  })
  @Roles(UserRoleEnum.USER)
  @Post('csv')
  async createFlashCardsFromCSV(@UserId() id: string): Promise<IFlashCard[]> {
   return  await this.flashCardService.createNewFlashCardsFromCSV(id);
  }
}
