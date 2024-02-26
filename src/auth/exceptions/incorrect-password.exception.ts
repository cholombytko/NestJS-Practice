import { UnauthorizedException } from '@nestjs/common';

export class IncorrectPasswordException extends UnauthorizedException {
  constructor(error?: string) {
    super('Incorrect password', error);
  }
}
