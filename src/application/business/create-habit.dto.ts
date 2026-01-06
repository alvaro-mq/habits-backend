import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  reminderTime?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  reminderDays?: string[];

  @IsString()
  habitParamId: string;
}
