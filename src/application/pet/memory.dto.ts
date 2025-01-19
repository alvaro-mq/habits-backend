import { IsDateString, IsOptional, IsString } from 'class-validator';

export class MemoryDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsDateString()
  date: string;
}
