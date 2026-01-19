import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { HabitLogService } from './habit-log.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('habit-log')
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async registerLog(@Body('habitId') habitId: string, @Body('completed') completed: boolean, @Req() req: Request) {
    const user = req.user as any;
    return this.habitLogService.createLog(habitId, completed, user.userId);
  }

  @Get('streak')
  @UseGuards(AuthGuard('jwt'))
  async getStreak(@Req() req: Request) {
    const user = req.user as any;
    const streak = await this.habitLogService.calculateStreak(user.userId);
    return { streak };
  }

  @Get('total')
  @UseGuards(AuthGuard('jwt'))
  async getTotal(@Req() req: Request) {
    const user = req.user as any;
    const total = await this.habitLogService.getTotalCompletedLogs(user.userId);
    return { total };
  }
}
