import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';
import { CardRepository } from './card.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardBucket } from './card-bucket.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
  ) {}

  getCards(filterDto: GetCardsFilterDto, user: User): Promise<Card[]> {
    return this.cardRepository.getCards(filterDto, user);
  }

  async getCardById(id: number, user: User): Promise<Card> {
    const found = await this.cardRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  async createCard(createCardDto: CreateCardDto, user: User): Promise<Card> {
    return this.cardRepository.createCard(createCardDto, user);
  }

  async deleteCard(id: number, user: User): Promise<void> {
    const result = await this.cardRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateCardBucket(
    id: number,
    bucket: CardBucket,
    user: User,
  ): Promise<Card> {
    const card = await this.getCardById(id, user);
    card.bucket = bucket;
    await card.save();
    return card;
  }
}
