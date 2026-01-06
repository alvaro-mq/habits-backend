import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { HabitLog } from './habit-log.entity';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { User } from '../user/user.entity';
import { HabitParam } from './habit-param.entity';

@Entity()
export class Habit extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  reminderTime: string;

  @Column('text', { array: true, nullable: true })
  reminderDays: string[];

  @Column({ default: 1 })
  difficulty: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.habits, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => HabitLog, (log) => log.habit, { cascade: true })
  logs: HabitLog[];

  @ManyToOne(() => HabitParam, (param) => param.habits, { onDelete: 'CASCADE' })
  habitParam: HabitParam;
}
