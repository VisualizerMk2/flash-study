import { CardBucket } from '../card-bucket.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetCardsFilterDto {
  @IsOptional()
  @IsIn([CardBucket.ONE, CardBucket.TWO, CardBucket.THREE])
  bucket: CardBucket;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
