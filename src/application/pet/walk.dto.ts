import { IsDecimal, IsNumber, IsString } from 'class-validator';

export class WalkDto {
  /* @IsString()
  route: string; */

  @IsString()
  description: string;

  @IsString()
  gpxFile: string;

  /* @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Distance must be a number with up to 2 decimal places',
  }) */
  @IsDecimal(
    { decimal_digits: '1,2' },
    { message: 'Distance must have up to 2 decimal places' },
  )
  distance: number;

  @IsString()
  location: string;

  @IsNumber()
  duration: number;

  @IsString()
  date: string;
}
