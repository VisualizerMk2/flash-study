import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { CardBucket } from './card-bucket.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  bucket: CardBucket;

  @ManyToOne(type => User, user => user.cards, { eager: false })
  user: User;

  @Column()
  userId: number;
}
