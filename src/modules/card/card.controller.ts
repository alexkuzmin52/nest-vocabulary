import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto, ICard, UpdateCardDto } from './dto';
import { UserRoleGuard } from '../../decorators/user-role.guard';
import { UserId } from '../../decorators/user-id.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { UserRoleEnum } from '../../constants';
import { Card } from './schemas/card.schema';

@ApiTags('Flash cards')
@ApiSecurity('access-key')
@UseGuards(UserRoleGuard)
@Controller('card')
export class CardController {
  constructor(private readonly CardService: CardService) {}

  @Roles(UserRoleEnum.USER)
  @Post('')
  @ApiOperation({ summary: 'Create a new card' })
  @ApiCreatedResponse({
    type: Card,
    description: 'Card created successful',
  })
  // @ApiBody({type: CreateCardDto})
  async createCard(
    @Body() createCardDto: CreateCardDto,
    @UserId() userId: string,
  ): Promise<ICard> {
    // console.log(userId);
    return await this.CardService.createNewCard(
      createCardDto,
      userId,
    );
  }

  @ApiOperation({ summary: 'Get all cards' })
  @ApiOkResponse({ type: [Card], description: 'All vocabulary cards' })
  @Roles(UserRoleEnum.USER)
  @Get('')
  // @Roles(UserRoleEnum.USER)
  async getCards(@UserId() userId: string): Promise<ICard[]> {
    return await this.CardService.getAllCards(userId);
  }

  @ApiOperation({ summary: 'Find card with a specific ID' })
  @ApiOkResponse({
    type: Card,
    description: 'Found card with a specific ID',
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Get(':id')
  async getCard(@Param('id') cardId: string): Promise<ICard> {
    return await this.CardService.findCardById(cardId);
  }

  @ApiOperation({ summary: 'Find cards by filter ' })
  @ApiOkResponse({
    type: [Card],
    description: 'Found cards by filter',
  })
  // @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Get('query')
  @ApiOperation({ summary: 'Update card' })
  @ApiOkResponse({
    type: Card,
    description: 'Updated card with a specific ID',
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Put('/:id')
  async updateCard(
    @Param('id') CardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<ICard> {
    return await this.CardService.updateCardByParam(
      CardId,
      updateCardDto,
    );
  }

  @ApiOperation({ summary: 'Remove card' })
  @ApiOkResponse({ type: Card, description: 'Deleted card' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @Roles(UserRoleEnum.USER)
  @Delete('/:id')
  async deleteCard(@Param('id') CardId: string): Promise<ICard> {
    return await this.CardService.deleteCardById(CardId);
  }

  @ApiOperation({ summary: 'Upload cards from CSV file' })
  @ApiCreatedResponse({
    type: [Card],
    description: 'Cards created successful',
  })
  @Roles(UserRoleEnum.USER)
  @Post('csv')
  async createCardsFromCSV(@UserId() id: string): Promise<ICard[]> {
    return await this.CardService.createNewCardsFromCSV(id);
  }
}
