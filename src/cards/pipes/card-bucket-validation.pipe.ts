import { PipeTransform, BadRequestException } from '@nestjs/common';
import { CardBucket } from '../card-bucket.enum';

export class CardBucketValidationPipe implements PipeTransform {
  readonly allowedBuckets = [CardBucket.ONE, CardBucket.TWO, CardBucket.THREE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isBucketValid(value)) {
      throw new BadRequestException(`${value} is an invalid bucket`);
    }
    return value;
  }

  private isBucketValid(bucket: any) {
    const index = this.allowedBuckets.indexOf(bucket);
    return index !== -1;
  }
}
