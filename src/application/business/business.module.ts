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
import { UserAlterEgo } from './user-alterego.entity';
import { UserAlterEgoController } from './user-alterego.controller';
import { UserAlterEgoRepository } from './user-alterego.repository';
import { HabitLogController } from './habit-log.controller';
import { HabitLogService } from './habit-log.service';
import { HabitLogRepository } from './habit-log.repository';
import { FeatController } from './feat.controller';
import { FeatService } from './feat.service';
import { FeatRepository } from './feat.repository';
import { FeatParamRepository } from './feat-param.repository';
import { Feat } from './feat.entity';
import { FeatParam } from './feat-param.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog, AlterEgo, HabitParam, UserAlterEgo, Feat, FeatParam])],
  controllers: [AlterEgoController, HabitController, UserAlterEgoController, HabitLogController, FeatController],
  providers: [
    AlterEgoRepository,
    UserRepository,
    AlterEgoService,
    HabitController,
    HabitService,
    HabitRepository,
    HabitParamRepository,
    UserAlterEgoRepository,
    HabitLogService,
    HabitLogRepository,
    FeatService,
    FeatRepository,
    FeatParamRepository,
  ],
  exports: [UserRepository, AlterEgoRepository, HabitRepository, UserAlterEgoRepository, FeatRepository, FeatParamRepository],
})
export class BusinessModule {}
