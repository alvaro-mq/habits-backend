import { Controller, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlterEgo } from './user-alterego.entity';
import { AlterEgo } from './alterego.entity';
import { User } from '../user/user.entity';
import { AlterEgoService } from './alterego.service';

@Controller('user-alterego')
export class UserAlterEgoController {
  constructor(
    private readonly alterEgoService: AlterEgoService
  ) {}

  @Post(':alterEgoId')
  @UseGuards(AuthGuard('jwt'))
  async updateCustomization(
    @Param('alterEgoId') alterEgoId: string,
    @Body() body: { customName?: string; customImage?: string },
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.alterEgoService.updateCustomization(user.userId, alterEgoId, body.customName, body.customImage);
  }
}
