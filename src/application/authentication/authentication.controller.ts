import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly userService: UserService) {}
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
      await this.userService.createUser(req.user, 'google');
    }
    return {
      message: 'Usuario autenticado exitosamente',
      user: req.user,
    };
  }
}
