import { UnauthorizedException } from '@nestjs/common';

export class AuthTokenNotFoundException extends UnauthorizedException {
  constructor(error?: string) {
    super('Authorization token not found', error);
  }
}
