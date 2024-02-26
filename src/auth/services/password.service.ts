import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}
  async hash(password: string): Promise<string> {
    const salt = this.configService.get<string>('SALT');

    return bcrypt.hash(password, salt);
  }

  async compare(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, storedPassword);
  }
}
