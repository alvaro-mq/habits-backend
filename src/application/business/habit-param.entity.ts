import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { AlterEgo } from './alterego.entity';
import { Habit } from './habit.entity';

@Entity()
export class HabitParam extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  icon: string;

  @Column({ name: 'alterEgoId', nullable: true })
  alterEgoId: string;

  @ManyToOne(() => AlterEgo, (alterEgo) => alterEgo.habits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alterEgoId' })
  alterEgo: AlterEgo;

  @OneToMany(() => Habit, (habit) => habit.habitParam)
  habits: Habit[];
}
