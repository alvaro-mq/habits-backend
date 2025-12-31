import { IsString } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
