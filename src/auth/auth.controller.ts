import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDto } from './dto/auth-data.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpData: AuthDto): Promise<{ access_token: string }> {
    return this.authService.signUp(signUpData);
  }

  @Post('signIn')
  async signIn(@Body() signInData: AuthDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInData);
  }
}
