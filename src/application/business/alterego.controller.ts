import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AlterEgoService } from './alterego.service';
import { CreateAlterEgoDto } from './create-alterego.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('alterego')
export class AlterEgoController {
  constructor(private alterEgoService: AlterEgoService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createAlterEgo(@Body() createAlterEgo: CreateAlterEgoDto, @Req() req: Request) {
    const user = req.user as any;
    return this.alterEgoService.createAlterEgo(createAlterEgo, user.userId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: Request) {
    const user = req.user as any;
    return this.alterEgoService.findAll(user.userId);
  }
}
