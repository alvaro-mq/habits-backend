import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './habit.entity';
import { HabitLog } from './habit-log.entity';
import { AlterEgoController } from './alterego.controller';
import { AlterEgoRepository } from './alterego.repository';
import { UserRepository } from '../user/user.repository';
import { AlterEgo } from './alterego.entity';
import { AlterEgoService } from './alterego.service';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { HabitRepository } from './habit.repository';
import { HabitParam } from './habit-param.entity';
import { HabitParamRepository } from './habit-param.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog, AlterEgo, HabitParam])],
  controllers: [AlterEgoController, HabitController],
  providers: [
    AlterEgoRepository,
    UserRepository,
    AlterEgoService,
    HabitController,
    HabitService,
    HabitRepository,
    HabitParamRepository,
  ],
  exports: [UserRepository, AlterEgoRepository, HabitRepository],
})
export class BusinessModule {}
