import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 20;

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  password: string;
}
