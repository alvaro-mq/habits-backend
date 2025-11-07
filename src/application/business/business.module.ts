import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './habit.entity';
import { HabitLog } from './habit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog])],
  //controllers: [UserController],
  //providers: [UserService, UserRepository, RoleRepository],
  // exports: [UserRepository, RoleRepository],
})
export class BusinessModule {}
