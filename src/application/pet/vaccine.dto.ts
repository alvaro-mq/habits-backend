import { IsString } from 'class-validator';

export class VaccineDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  dateAdministered: string;

  @IsString()
  dosage: string;

  @IsString()
  batchNumber: string;
}
