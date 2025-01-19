// users.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Endpoint para crear un usuario
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createCustomUser(createUserDto);
  }

  // Endpoint para obtener todos los usuarios (opcional)
  @Get()
  async getUsers() {
    return this.userService.findAll();
  }
}
