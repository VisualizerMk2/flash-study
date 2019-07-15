import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  answer: string;
}
