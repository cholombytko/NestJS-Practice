import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthTokenNotFoundException } from '../exceptions/no-auth-token.exception';
import { InvalidTokenException } from '../exceptions/invalid-token-exception';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new AuthTokenNotFoundException();

    const payload = await this.jwtService.verifyAsync(token);

    if (!payload) throw new InvalidTokenException();

    const user = await this.userService.findOne({ username: payload.username });

    if (!user) throw new UserNotFoundException();

    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
