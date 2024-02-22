import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { UserService } from 'src/user/user.service';
import { IAuthData } from '../interfaces/auth-data.interface';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { IncorrectPasswordException } from '../exceptions/incorrect-password.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private userService: UserService,
  ) {}

  async signUp(signUpData: IAuthData): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({
      username: signUpData.username,
    });

    if (user) throw new UserAlreadyExistsException();

    const hash = await this.passwordService.hash(signUpData.password);

    await this.userService.create({
      username: signUpData.username,
      password: hash,
    });

    const payload = { username: signUpData.username };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  async signIn(signInData: IAuthData): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({
      username: signInData.username,
    });

    if (!user) throw new UserNotFoundException();

    const isPasswordCorrect = await this.passwordService.compare(
      signInData.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new IncorrectPasswordException();

    const payload = { username: signInData.username };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
