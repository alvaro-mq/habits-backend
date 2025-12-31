import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './habit.entity';
import { HabitLog } from './habit-log.entity';
import { AlterEgoController } from './alterego.controller';
import { AlterEgoRepository } from './alterego.repository';
import { UserRepository } from '../user/user.repository';
import { AlterEgo } from './alterego.entity';
import { AlterEgoService } from './alterego.service';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog, AlterEgo])],
  controllers: [AlterEgoController],
  providers: [AlterEgoRepository, UserRepository, AlterEgoService],
  exports: [UserRepository, AlterEgoRepository],
})
export class BusinessModule {}
