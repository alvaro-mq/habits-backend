import { IsOptional, IsString } from 'class-validator';

export class AdviceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  group: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
