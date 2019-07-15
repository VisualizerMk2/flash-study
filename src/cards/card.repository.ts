import { Repository, EntityRepository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { CardBucket } from './card-bucket.enum';
import { GetCardsFilterDto } from './dto/get-cards-filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
  async getCards(filterDto: GetCardsFilterDto, user: User): Promise<Card[]> {
    const { bucket, search } = filterDto;
    const query = this.createQueryBuilder('card');

    query.where('card.userId = :userId', { userId: user.id });

    if (bucket) {
      query.andWhere('card.bucket = :bucket', { bucket });
    }

    if (search) {
      query.andWhere(
        '(card.question LIKE :search OR card.answer LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const cards = await query.getMany();
    return cards;
  }

  async createCard(createCardDto: CreateCardDto, user: User): Promise<Card> {
    const { question, answer } = createCardDto;
    const card = new Card();
    card.question = question;
    card.answer = answer;
    card.bucket = CardBucket.ONE;
    card.user = user;
    await card.save();
    delete card.user;

    return card;
  }
}
