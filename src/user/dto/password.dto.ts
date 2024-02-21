import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 20;

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  password: string;
}
