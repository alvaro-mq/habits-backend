import { IsString, IsEmail, MinLength, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  /* @IsEmail()
  fullName: string; */

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @IsIn(['F', 'M'])
  gender?: string;
}
