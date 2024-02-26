import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor(error?: string) {
    super('Invalid token', error);
  }
}
