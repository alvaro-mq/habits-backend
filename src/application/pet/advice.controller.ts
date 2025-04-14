import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AdviceDto } from './advice.dto';
import { AdviceService } from './advice.service';

@Controller('/advice')
export class PetController {
  constructor(private readonly adviceService: AdviceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createAdvice(@Body() adviceDto: AdviceDto, @Req() req: Request) {
    const user = req.user as any;
    const advice = await this.adviceService.createAdvice(
      adviceDto,
      user.email ?? user.userId,
    );
    return advice;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getRandomAdvices(@Req() req: Request) {
    const user = req.user as any;
    const pet = await this.adviceService.getAdvice(user.email);
    return pet;
  }
}
