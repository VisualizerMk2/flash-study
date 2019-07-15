import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';
import { CardBucketValidationPipe } from './pipes/card-bucket-validation.pipe';
import { Card } from './card.entity';
import { CardBucket } from './card-bucket.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('cards')
@UseGuards(AuthGuard())
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  getCards(
    @Query(ValidationPipe) filterDto: GetCardsFilterDto,
    @GetUser() user: User,
  ): Promise<Card[]> {
    return this.cardsService.getCards(filterDto, user);
  }

  @Get('/:id')
  getCardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.getCardById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCard(
    @Body() createCardDto: CreateCardDto,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.createCard(createCardDto, user);
  }

  @Patch('/:id/bucket')
  updateCardBucket(
    @Body('cardBucket', CardBucketValidationPipe) cardBucket: CardBucket,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Card> {
    return this.cardsService.updateCardBucket(id, cardBucket, user);
  }

  @Delete('/:id')
  deleteCard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.cardsService.deleteCard(id, user);
  }
}
