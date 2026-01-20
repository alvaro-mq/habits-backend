import { IsString, IsOptional } from 'class-validator';

export class CreateAlterEgoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nameFemale: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  imageUrlFemale: string;

  @IsOptional()
  @IsString()
  customNameFemale: string;
}
