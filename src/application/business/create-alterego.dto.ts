import { IsString } from 'class-validator';

export class CreateAlterEgoDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;
}
