import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
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
}
