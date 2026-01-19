import { Controller, Post, Body, Get, UseGuards, Req, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createCustomUser(createUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req: Request) {
    const user = req.user as any;
    return this.userService.findById(user.userId);
  }

  @Get()
  async getUsers() {
    return this.userService.findAll();
  }

  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Req() req: Request, @Body() body: { fullName?: string; photo?: string; gender?: string }) {
    const user = req.user as any;
    return this.userService.updateProfile(user.userId, body);
  }
}
