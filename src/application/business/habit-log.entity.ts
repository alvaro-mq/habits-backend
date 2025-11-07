import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { Habit } from './habit.entity';

@Entity()
@Unique(['habit', 'date'])
export class HabitLog extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Habit, (habit) => habit.logs, { onDelete: 'CASCADE' })
  habit: Habit;

  @Column({ type: 'date' })
  date: string; // formato 'YYYY-MM-DD'

  @Column({ default: true })
  completed: boolean;
}
