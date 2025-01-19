import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { LoginDto } from './login.dto';
import { AuthenticationService } from './authentication.service';
import { IdentityProvider } from './identity-provider.enum';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // redirect google page
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = await this.userService.findByEmail(req.user.email);
    if (!user) {
      await this.userService.createUser(
        req.user,
        'google',
        IdentityProvider.GOOGLE,
      );
    }
    return {
      message: 'Usuario autenticado exitosamente',
      user: req.user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginWithCredentials(loginDto);
  }
}
