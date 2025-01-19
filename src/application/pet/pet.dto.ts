import { IsDateString, IsOptional, IsString } from 'class-validator';

export class PetDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly species: string;

  @IsString()
  readonly breed: string;

  @IsString()
  readonly sex: string;

  @IsDateString()
  readonly birthDate: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly size: string;

  @IsString()
  @IsOptional()
  readonly photo: string;
}
