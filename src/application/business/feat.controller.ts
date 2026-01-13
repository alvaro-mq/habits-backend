import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { FeatService } from './feat.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('feat')
export class FeatController {
  constructor(private readonly featService: FeatService) {}

  @Get('params')
  @UseGuards(AuthGuard('jwt'))
  async getFeatParams() {
    return this.featService.findAllParams();
  }

  @Get('latest')
  @UseGuards(AuthGuard('jwt'))
  async getLatest(@Req() req: Request) {
    const user = req.user as any;
    return this.featService.findLatest(user.userId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getFeats(@Req() req: Request) {
    const user = req.user as any;
    return this.featService.findAllByUser(user.userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createFeat(
    @Body()
    body: {
      featParamId: string;
      description: string;
      urlImage: string;
      date?: string;
    },
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.featService.createFeat(user.userId, body);
  }
}
