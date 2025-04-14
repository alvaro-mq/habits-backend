import { IsString, IsEmail, MinLength } from 'class-validator';

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
}
