import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { HabitService } from './habit.service';
import { CreateHabitDto } from './create-habit.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('habit')
export class HabitController {
  constructor(private habitService: HabitService) {}

  // Endpoint para crear un hábito
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createHabit(@Body() createHabitDto: CreateHabitDto, @Req() req: Request) {
    const user = req.user as any;
    const habit = await this.habitService.createHabit(createHabitDto, user.userId);
    return { id: habit.id };
  }

  // Endpoint para obtener todos los usuarios (opcional)
  @Get()
  async getHabits() {
    // return this.userService.findAll();
  }

  @Get('alteregos')
  @UseGuards(AuthGuard('jwt'))
  async getAlterEgos(@Req() req: Request) {
    const user = req.user as any;
    return this.habitService.getAlterEgosWithHabits(user.userId);
  }
}
